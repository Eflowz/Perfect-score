import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  getDiscussionsByCourse, 
  createDiscussion, 
  replyToDiscussion, 
  type DiscussionThread, 
  type DiscussionReply 
} from "../../api/discussions.api";
import { MdChatBubbleOutline, MdAdd, MdSearch, MdForum, MdSend, MdCode } from "react-icons/md";

export default function Discussions() {
  const { courseId } = useParams<{ courseId: string }>();
  const activeCourseId = courseId || "cuid-course-1"; // Dynamic fallback tracking

  // State Management
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [activeThread, setActiveThread] = useState<DiscussionThread | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Form Field Tracking
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadDiscussions() {
      try {
        setLoading(true);
        const data = await getDiscussionsByCourse(activeCourseId);
        setThreads(data);
        if (data.length > 0) setActiveThread(data[0]);
      } catch (err) {
        console.error("Error loading threads:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDiscussions();
  }, [activeCourseId]);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const created = await createDiscussion(activeCourseId, { title: newTitle, content: newContent });
      // Synthesize a complete thread UI model structure mapping mock user profile variables locally
      const fullThread: DiscussionThread = {
        ...created,
        courseId: activeCourseId,
        userId: "cuid-user-me",
        user: { id: "cuid-user-me", name: "You", email: "me@perfectscore.dev" },
        replies: []
      };
      setThreads([fullThread, ...threads]);
      setActiveThread(fullThread);
      setNewTitle("");
      setNewContent("");
      setIsCreating(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !replyContent.trim()) return;

    try {
      const addedReply = await replyToDiscussion(activeThread.id, { content: replyContent });
      // If server reply omits user sub-fields, fill them dynamically for inline responsiveness
      const standardReply: DiscussionReply = {
        ...addedReply,
        user: addedReply.user || { id: "cuid-user-me", name: "You" }
      };

      const updatedThread = {
        ...activeThread,
        replies: [...activeThread.replies, standardReply]
      };

      setThreads(threads.map(t => t.id === activeThread.id ? updatedThread : t));
      setActiveThread(updatedThread);
      setReplyContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredThreads = threads.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)]  text-gray-800 dark:text-gray-100 overflow-hidden font-sans  animate-in fade-in duration-300">
      
      {/* LEFT PANE: MASTER SEARCH & FEED LIST */}
      <div className="w-96 border-r border-gray-200/60 dark:border-white/5 flex flex-colshrink-0">
        <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-[#16423C] dark:text-[#C2FFC1] flex items-center gap-2">
              <MdForum size={18} /> COMMUNITY FEED
            </h2>
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="p-1.5 rounded-lg bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#0F2C28] hover:scale-105 transition-transform cursor-pointer"
            >
              <MdAdd size={16} />
            </button>
          </div>

          {/* Search bar context controls */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/70 dark:bg-black/20 border border-gray-200/50 dark:border-white/5 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-[#16423C] dark:focus:border-[#C2FFC1] transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Feed Roll */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200/30 dark:divide-emerald-950/20">
          {loading ? (
            <div className="p-8 text-center text-xs text-gray-400 animate-pulse">Loading discussion streams...</div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">No matching threads found.</div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = activeThread?.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => { setActiveThread(thread); setIsCreating(false); }}
                  className={`p-4 cursor-pointer text-left transition-all relative ${
                    isActive 
                      ? "bg-gray-50 dark:bg-black/20 shadow-[inset_4px_0_0_0_#16423C] dark:shadow-[inset_4px_0_0_0_#C2FFC1]" 
                      : "hover:bg-gray-100/40 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 mb-1.5">
                    <span className="bg-gray-200/60 dark:bg-emerald-950/60 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded font-mono"># env-config</span>
                    <span>•</span>
                    <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">
                    {thread.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {thread.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#16423C] text-white flex items-center justify-center text-[8px] font-bold font-mono">
                        {thread.user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{thread.user.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MdChatBubbleOutline size={12} /> {thread.replies.length}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANE: DETAIL ACTIVE WORKSPACE */}
      <div className="flex-1 flex flex-col ">
        {isCreating ? (
          /* NEW CONTEXT CREATION FORM */
          <form onSubmit={handleCreateThread} className="p-8 max-w-2xl mx-auto w-full flex flex-col gap-5 text-left">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Initialize Discussion Thread</h3>
              <p className="text-xs text-gray-400 mt-1">Broadcast your core engineering hurdles to your project cohort metrics track.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Topic Title Summary</label>
              <input 
                type="text"
                placeholder="e.g. Invariant Violation: Task submission runtime payload out of balance"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#16423C] dark:focus:border-[#C2FFC1]"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Context Content Payload</label>
              <textarea 
                placeholder="Detail what logic breaks, output terminal code dumps directly here..."
                rows={8}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#16423C] dark:focus:border-[#C2FFC1] font-mono resize-none"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-emerald-950/20 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#0F2C28] shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                Broadcast Thread
              </button>
            </div>
          </form>
        ) : activeThread ? (
          /* CONVERSATION TIMELINE VIEW */
          <>
            {/* Timeline Header bar */}
            <div className="px-6 py-4 border-b border-gray-200/60 dark:border-white/5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                  <MdCode size={12} /> TRACK CONTEXT
                </span>
              </div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                {activeThread.title}
              </h1>
            </div>

            {/* Scrolling Core Timeline Post + Replies */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 text-left">
              {/* Primary Question Element Post Box */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-[#16423C] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  {activeThread.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{activeThread.user.name}</span>
                    <span className="text-[10px] text-gray-400">{new Date(activeThread.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {activeThread.content}
                  </p>
                </div>
              </div>

              {/* Dividing visual thread rules indicator line */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-gray-100 dark:border-emerald-950/20"></div>
                <span className="shrink mx-4 text-[10px] text-gray-400 font-bold tracking-widest uppercase">Timeline Evolution</span>
                <div className="grow border-t border-gray-100 dark:border-emerald-950/20"></div>
              </div>

              {/* Nested Reply Iteration blocks */}
              {activeThread.replies.map((reply) => (
                <div key={reply.id} className="flex gap-4 items-start pl-8">
                  <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-emerald-950 text-gray-700 dark:text-[#C2FFC1] border border-gray-300 dark:border-emerald-800/40 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    {reply.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 bg-white dark:bg-black/20 border border-gray-200/50 dark:border-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{reply.user.name}</span>
                      <span className="text-[10px] text-gray-400">{new Date(reply.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Input Action Tray Footer bar */}
            <div className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-200/60 dark:border-white/5">
              <form onSubmit={handlePostReply} className="relative flex items-center bg-white dark:bg-[#16423C] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-2">
                <textarea 
                  placeholder="Propose solution timeline corrections inline here..."
                  rows={1}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-gray-800 dark:text-gray-100 focus:outline-none resize-none pr-12 py-1.5 min-h-5 max-h-30"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2.5 p-1.5 rounded-lg bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#0F2C28] hover:scale-105 transition-transform cursor-pointer"
                >
                  <MdSend size={14} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
            <MdForum size={32} className="text-gray-300 dark:text-emerald-950" />
            <p className="text-xs">Select or construct a track cohort thread to initialize context viewports.</p>
          </div>
        )}
      </div>

    </div>
  );
}
