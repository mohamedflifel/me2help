import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, History, X, Sparkles, MessageSquareHeart, LogOut, Trash2, SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logoutApi } from '../api/user.api';
import { useChat } from '../hooks/useChat';
import { getSessionsApi, getSessionByIdApi, deleteSessionApi } from '../api/session.api';
import { sendMessageApi } from '../api/chat.api';
import { UiMessage } from '../hooks/useChat';
import { Session } from '../types';
import { useState } from 'react';

const INITIAL_MESSAGE: import('../hooks/useChat').UiMessage = {
  id: '1',
  textUser: '',
  aiResponse: "Welcome to your digital sanctuary. I'm me2help, and I'm here to listen. How are you feeling in this moment?",
  emotion: null,
  timestamp: new Date(),
};

const ChatPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [historyMessages, setHistoryMessages] = useState<UiMessage[] | null>(null);
  const [historyTitle, setHistoryTitle] = useState('');
  const [historySessionId, setHistorySessionId] = useState<string | null>(null);
  const [isHistorySending, setIsHistorySending] = useState(false);
  const [historyPendingText, setHistoryPendingText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { messages, loading: isLoading, sendMessage, pendingText, reset } = useChat();

  const allMessages = historyMessages ?? [INITIAL_MESSAGE, ...messages];

  // Load sessions when history panel opens
  useEffect(() => {
    if (isHistoryOpen) {
      getSessionsApi().then(setSessions).catch(() => {});
    }
  }, [isHistoryOpen]);

  const handleSessionClick = async (sessionId: string, title: string) => {
    try {
      const data = await getSessionByIdApi(sessionId);
      const uiMsgs: UiMessage[] = (data.messages ?? []).map((msg, i) => ({
        id: msg._id || msg.id || String(i),
        textUser: msg.textUser,
        aiResponse: msg.aiResponse,
        emotion: msg.emotion,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
      }));
      setHistoryMessages(uiMsgs);
      setHistorySessionId(sessionId);
      setHistoryTitle(title);
      setIsHistoryOpen(false);
    } catch {
      // ignore
    }
  };

  const handleBackToChat = () => {
    setHistoryMessages(null);
    setHistorySessionId(null);
    setHistoryTitle('');
  };

  const handleNewChat = () => {
    reset();
    setHistoryMessages(null);
    setHistorySessionId(null);
    setHistoryTitle('');
    setIsHistoryOpen(false);
  };

  const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    try {
      await deleteSessionApi(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId && (s as any)._id !== sessionId));
      // If currently viewing this session, go back to live chat
      if (historySessionId === sessionId) {
        handleBackToChat();
      }
    } catch {
      // ignore
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore — still log out locally even if server call fails
    } finally {
      logout();
      navigate('/');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, isLoading, isHistorySending]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const isSending = historySessionId ? isHistorySending : isLoading;
    if (!inputText.trim() || isSending) return;
    const text = inputText;
    setInputText('');

    if (historySessionId) {
      // Sending into a past session
      setHistoryPendingText(text);
      setIsHistorySending(true);
      try {
        const result = await sendMessageApi(historySessionId, [{ text }]);

        // 10-second delay before showing the reply
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newMsg: UiMessage = {
          id: result.id || Date.now().toString(),
          textUser: text,
          aiResponse: result.aiResponse,
          emotion: result.emotion ?? null,
          timestamp: new Date(result.timestamp),
        };
        setHistoryMessages(prev => [...(prev ?? []), newMsg]);
        // Update the session preview in sidebar to match what the backend stores
        setSessions(prev => prev.map(s =>
          (s.id === historySessionId || (s as any)._id === historySessionId)
            ? { ...s, lastMessage: result.aiResponse, updatedAt: new Date(result.timestamp).toISOString() }
            : s
        ));
      } catch {
        // ignore
      } finally {
        setHistoryPendingText(null);
        setIsHistorySending(false);
      }
    } else {
      await sendMessage(text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      <nav className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 z-20 glass-panel border-b border-white/20">
        <div className="flex items-center gap-2">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-pink-400">
            <Heart size={24} fill="currentColor" />
          </motion.div>
          <h1 className="text-lg sm:text-2xl font-serif-soft text-[#6B5B95] tracking-tight">me2help <span className="text-xs sm:text-sm font-sans font-light opacity-60">Ai</span></h1>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleNewChat} title="New chat" className="p-2 rounded-full hover:bg-white/40 transition-colors text-[#6B5B95]">
            <SquarePen size={22} />
          </button>
          <button onClick={() => setIsHistoryOpen(!isHistoryOpen)} className="p-2 rounded-full hover:bg-white/40 transition-colors text-[#6B5B95]">
            <History size={24} />
          </button>
          <button
            onClick={handleLogout}
            title="Disconnect"
            className="p-2 rounded-full hover:bg-red-100/60 transition-colors text-[#9A8C98] hover:text-red-400"
          >
            <LogOut size={22} />
          </button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8 scroll-smooth">

            {/* History title bar */}
            {historyMessages && (
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <button onClick={handleBackToChat} className="text-xs text-[#6B5B95] hover:underline flex items-center gap-1">
                    ← Back to chat
                  </button>
                  <span className="text-xs text-[#9A8C98] italic">{historyTitle}</span>
                </div>
                {historySessionId && (
                  <button
                    onClick={(e) => handleDeleteSession(e, historySessionId)}
                    title="Delete session"
                    className="p-1.5 rounded-full text-[#9A8C98] hover:text-red-400 hover:bg-red-50/60 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )}
            {historyMessages?.length === 0 && (
              <p className="text-sm text-[#9A8C98] text-center italic">No messages in this session.</p>
            )}

            {/* Messages — shared renderer for both live chat and history */}
            <AnimatePresence mode="popLayout">
              {allMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {message.textUser ? (
                    <div className="flex justify-end">
                      <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[70%] px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-sm bg-[#E2D1F9]/60 font-handwritten text-xl text-[#4A4E69] rounded-br-none border border-[#DCD0FF]">
                        <p className="leading-relaxed whitespace-pre-wrap">{message.textUser}</p>
                        <span className="text-[10px] opacity-40 mt-2 block text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[70%] px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-sm glass-panel glow-ai text-[#4A4E69] rounded-bl-none">
                      <p className="leading-relaxed whitespace-pre-wrap">{message.aiResponse}</p>
                      {message.emotion && (
                        <p className="text-[11px] text-[#6B5B95] font-medium mt-2 italic">Detected emotion: {message.emotion}</p>
                      )}
                      <span className="text-[10px] opacity-40 mt-2 block text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Optimistic user bubble while awaiting response */}
            {(isLoading && pendingText || isHistorySending && historyPendingText) && (
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }} className="flex justify-end">
                <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[70%] px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-sm bg-[#E2D1F9]/60 font-handwritten text-xl text-[#4A4E69] rounded-br-none border border-[#DCD0FF]">
                  <p className="leading-relaxed whitespace-pre-wrap">{historyPendingText ?? pendingText}</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
            {(isLoading || isHistorySending) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="glass-panel px-5 py-4 rounded-3xl rounded-bl-none flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block w-2 h-2 rounded-full bg-[#C3B1E1]"
                      animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 sm:p-6">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D1E8E2] to-[#E2D1F9] rounded-[32px] opacity-20 blur-sm group-focus-within:opacity-40 transition-opacity" />
              <div className="relative glass-panel rounded-[24px] sm:rounded-[30px] p-1.5 sm:p-2 flex items-end gap-2 pr-3 sm:pr-4 shadow-lg ring-1 ring-white/50">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="How are you feeling today?"
                  rows={1}
                  className="w-full bg-transparent border-none focus:ring-0 p-3 sm:p-4 text-base sm:text-lg text-[#4A4E69] placeholder:text-[#9A8C98] placeholder:font-light resize-none max-h-36 sm:max-h-48"
                  style={{ minHeight: '60px' }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading || isHistorySending}
                  className={`p-3 rounded-full transition-all duration-300 ${inputText.trim() && !isLoading && !isHistorySending ? 'bg-[#6B5B95] text-white scale-110 shadow-md hover:shadow-xl' : 'bg-gray-200 text-gray-400'}`}
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-light">A Safe space for your thoughts</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isHistoryOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHistoryOpen(false)} className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-30 lg:hidden" />
              <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute right-0 top-0 h-full w-72 sm:w-80 glass-panel border-l border-white/30 z-40 p-4 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-serif-soft text-[#6B5B95]">Past Reflections</h2>
                  <button onClick={() => setIsHistoryOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                  {sessions.length === 0 && (
                    <p className="text-sm text-[#9A8C98] text-center mt-8 italic">No past sessions yet.</p>
                  )}
                  {[...sessions]
                    .sort((a, b) => new Date((b as any).updatedAt ?? b.createdAt).getTime() - new Date((a as any).updatedAt ?? a.createdAt).getTime())
                    .map((session) => (
                    <motion.div
                      key={session.id || (session as any)._id}
                      onClick={() => handleSessionClick((session as any)._id || session.id, session.title)}
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-2xl bg-white/40 border border-white/20 hover:bg-white/60 cursor-pointer transition-colors group relative">
                      <div className="flex items-center gap-3 mb-1">
                        <MessageSquareHeart size={14} className="text-pink-300" />
                        <span className="text-[10px] font-bold text-[#9A8C98] uppercase tracking-tighter">
                          {new Date((session as any).updatedAt ?? session.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={(e) => handleDeleteSession(e, (session as any)._id || session.id)}
                          title="Delete"
                          className="ml-auto p-1 rounded-full text-transparent group-hover:text-[#9A8C98] hover:!text-red-400 hover:bg-red-50/60 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-sm text-[#4A4E69] line-clamp-1 group-hover:text-[#6B5B95]">{session.title}</p>
                      <p className="text-[11px] text-[#9A8C98] line-clamp-1 mt-0.5 italic">
                        {(session as any).lastMessage ?? 'No messages yet'}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-white/20">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#D1E8E2]/50 to-[#E2D1F9]/50 flex items-center gap-3">
                    <Sparkles className="text-[#6B5B95]" size={20} />
                    <div>
                      <h4 className="text-xs font-bold text-[#6B5B95]">Monthly Summary</h4>
                      <p className="text-[10px] text-[#4A4E69]/70 italic">You've expressed gratitude 12 times this week.</p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ChatPage;