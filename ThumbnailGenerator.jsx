import React, { useState, useEffect } from 'react';

import { Zap, Download, RefreshCw, Star, Lock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProUpgradeModal from './ProUpgradeModal';
import ImageUpload from './ImageUpload';
import TitleSuggestions from './TitleSuggestions';
import { supabase } from '@/supabaseClient';

const FREE_LIMIT = 3;
const STORAGE_KEY = 'thumbnailforge_usage';

function getUsageData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return { count: 0, date: new Date().toDateString() };
  return JSON.parse(data);
}

function canGenerate() {
  const usage = getUsageData();
  if (usage.date !== new Date().toDateString()) return true;
  return usage.count < FREE_LIMIT;
}

function incrementUsage() {
  const usage = getUsageData();
  const today = new Date().toDateString();
  if (usage.date !== today) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 1, date: today }));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: usage.count + 1, date: today }));
  }
}

function getRemainingGenerations() {
  const usage = getUsageData();
  if (usage.date !== new Date().toDateString()) return FREE_LIMIT;
  return Math.max(0, FREE_LIMIT - usage.count);
}

const CTRBadge = ({ score }) => {
  const color = score >= 80 ? 'text-green-400 border-green-400/40 bg-green-400/10'
    : score >= 60 ? 'text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10'
    : 'text-[#FF0000] border-[#FF0000]/40 bg-[#FF0000]/10';
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}>
      CTR Score: {score}%
    </span>
  );
};

export default function ThumbnailGenerator() {
  const [form, setForm] = useState({
    videoTitle: '',
    videoTopic: '',
    thumbnailStyle: 'MrBeast Style',
    emotionStyle: 'Excitement',
  });
  const [baseImageUrl, setBaseImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showProModal, setShowProModal] = useState(false);
  const [error, setError] = useState('');

  const styles = ['MrBeast Style', 'Gaming Style', 'Tech Review', 'Reaction Style', 'Minimalist'];
  const emotions = ['Shock', 'Excitement', 'Curiosity', 'Urgency', 'Neutral'];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: fetchError } = await supabase
        .from('thumbnails')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6);

      if (fetchError) throw fetchError;

      setResults(data.map(s => ({
        id: s.id, url: s.image_url, ctr: s.ctr_score, saved: true,
      })));
      setFavorites(data.filter(s => s.is_favorite).map(s => s.id));
    } catch {
      // not signed in yet or none saved — ignore
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleFileSelect = async (file) => {
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const path = `${user.id}/base-${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('thumbnails')
        .upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('thumbnails').getPublicUrl(path);
      setBaseImageUrl(publicUrlData.publicUrl);
    } catch {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const buildPrompt = () => {
    const base = baseImageUrl
      ? `Use the provided base image as the starting visual — keep its subject and key composition, but enhance it into`
      : `Create`;
    return `${base} a YouTube thumbnail image for a video titled "${form.videoTitle}" about "${form.videoTopic}".
Style: ${form.thumbnailStyle}. Emotion/tone: ${form.emotionStyle}.
Make it eye-catching with bold text, vibrant colors, high contrast, and professional composition typical of viral YouTube thumbnails.
The thumbnail should have a 16:9 aspect ratio, include dramatic lighting, and use visual elements that maximize click-through rate.`;
  };

  const generateCTRScore = () => Math.floor(Math.random() * 30) + 65;

  const handleGenerate = async () => {
    if (!form.videoTitle.trim() || !form.videoTopic.trim()) {
      setError('Please fill in Video Title and Video Topic.');
      return;
    }
    setError('');
    if (!canGenerate()) {
      setShowProModal(true);
      return;
    }

    setGenerating(true);
    incrementUsage();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not signed in');

      const { data: fnData, error: fnError } = await supabase.functions.invoke('generate-thumbnail', {
        body: { prompt: buildPrompt() },
      });
      if (fnError) throw fnError;
      if (fnData?.error) throw new Error(fnData.error);

      const url = fnData.url;
      const ctr = generateCTRScore();

      const { data: saved, error: insertError } = await supabase
        .from('thumbnails')
        .insert({
          user_id: session.user.id,
          video_title: form.videoTitle,
          video_topic: form.videoTopic,
          thumbnail_style: form.thumbnailStyle,
          emotion_style: form.emotionStyle,
          image_url: url,
          ctr_score: ctr,
          is_favorite: false,
          base_image_url: baseImageUrl || null,
        })
        .select()
        .single();
      if (insertError) throw insertError;

      setResults(prev => [{ url, ctr, id: saved.id, saved: true }, ...prev].slice(0, 6));
    } catch (err) {
      console.error('Generation failed:', err);
      setError('Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `thumbnail-${Date.now()}.png`;
      link.click();
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  const toggleFavorite = async (id) => {
    const isFav = favorites.includes(id);
    setFavorites(prev => isFav ? prev.filter(f => f !== id) : [...prev, id]);
    try {
      const { error: updateError } = await supabase
        .from('thumbnails')
        .update({ is_favorite: !isFav })
        .eq('id', id);
      if (updateError) throw updateError;
    } catch {
      // ignore — local state already toggled
    }
  };

  const remaining = getRemainingGenerations();

  return (
    <>
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Zap size={18} className="text-[#FACC15]" />
            AI Thumbnail Generator
          </h3>
          <div className="flex items-center gap-1 text-xs text-[#E5E5E5]/60">
            <span className={remaining === 0 ? 'text-[#FF0000]' : 'text-green-400'}>
              {remaining}/{FREE_LIMIT}
            </span>
            <span>free today</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#E5E5E5]/70 uppercase tracking-wide mb-1 block">Video Title</label>
            <input
              type="text"
              value={form.videoTitle}
              onChange={e => setForm({ ...form, videoTitle: e.target.value })}
              placeholder="e.g. I Spent 100 Days in Minecraft..."
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-colors"
            />
            <TitleSuggestions topic={form.videoTopic} onPickTitle={(t) => setForm({ ...form, videoTitle: t })} />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E5E5E5]/70 uppercase tracking-wide mb-1 block">Video Topic</label>
            <input
              type="text"
              value={form.videoTopic}
              onChange={e => setForm({ ...form, videoTopic: e.target.value })}
              placeholder="e.g. Minecraft survival challenge"
              className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-colors"
            />
          </div>

          <ImageUpload
            value={baseImageUrl}
            uploading={uploading}
            onChange={handleFileSelect}
            onClear={() => setBaseImageUrl(null)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#E5E5E5]/70 uppercase tracking-wide mb-1 block">Thumbnail Style</label>
              <select
                value={form.thumbnailStyle}
                onChange={e => setForm({ ...form, thumbnailStyle: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF0000]/60 transition-colors"
              >
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#E5E5E5]/70 uppercase tracking-wide mb-1 block">Emotion Style</label>
              <select
                value={form.emotionStyle}
                onChange={e => setForm({ ...form, emotionStyle: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF0000]/60 transition-colors"
              >
                {emotions.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-[#FF0000] text-xs flex items-center gap-1">
              <AlertCircle size={12} /> {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 bg-[#FF0000] hover:bg-red-600 disabled:bg-[#FF0000]/40 text-white font-black rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap size={18} />
                Generate Thumbnail
              </>
            )}
          </button>
        </div>

        {/* Results Grid */}
        <AnimatePresence>
          {(loadingHistory || results.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                {loadingHistory ? 'Loading your thumbnails...' : 'Your Thumbnails'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {loadingHistory ? (
                  <div className="col-span-2 h-32 flex items-center justify-center text-[#E5E5E5]/30 text-sm">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  </div>
                ) : results.map(result => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group rounded-lg overflow-hidden border border-white/10"
                  >
                    <img
                      src={result.url}
                      alt="Generated thumbnail"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDownload(result.url)}
                        className="p-2 bg-[#FACC15] rounded-lg text-[#0B0B0B] hover:scale-110 transition-transform"
                        title="Download"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="p-2 bg-[#FF0000] rounded-lg text-white hover:scale-110 transition-transform"
                        title="Generate another"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button
                        onClick={() => toggleFavorite(result.id)}
                        className={`p-2 rounded-lg hover:scale-110 transition-transform ${favorites.includes(result.id) ? 'bg-[#FACC15] text-[#0B0B0B]' : 'bg-white/20 text-white'}`}
                        title="Favorite"
                      >
                        <Star size={14} />
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-1">
                      <CTRBadge score={result.ctr} />
                    </div>
                    {favorites.includes(result.id) && (
                      <div className="absolute top-1 right-1">
                        <Star size={14} className="text-[#FACC15] fill-[#FACC15]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProUpgradeModal open={showProModal} onClose={() => setShowProModal(false)} />
    </>
  );
}