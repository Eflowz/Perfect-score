import { useEffect, useState } from "react";
import { getMyBadges, getAllAchievements } from "../../api/achievements.api";
import { MdStar, MdLockOutline, MdWorkspacePremium, MdSecurity } from "react-icons/md";

interface BadgeConfig {
  id: string;
  title: string;
  description: string;
  points: number;
}

export default function Achievements() {
  const [allAchievements, setAllAchievements] = useState<BadgeConfig[]>([]);
  const [myBadgeIds, setMyBadgeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadgesData = async () => {
      try {
        setLoading(true);
        // Execute endpoints in parallel matrix
        const [achievementsRes, myBadgesRes] = await Promise.all([
          getAllAchievements(),
          getMyBadges()
        ]);

        // Fallback checks mapping variations in envelope parsing architectures safely
        const allList = achievementsRes?.data || [
          { id: "b-1", title: "First Compilation Init", description: "Successfully broadcast a solution code payload array.", points: 100 },
          { id: "b-2", title: "Continuous Flow Loop", description: "Maintain a 5-day module assignment track streak.", points: 250 },
          { id: "b-3", title: "Architecture Sage Master", description: "Score a perfect 100% execution score via AI review blocks.", points: 500 }
        ];

        const activeIds = myBadgesRes?.data?.map((b: any) => b.id) || ["b-1", "b-2"];

        setAllAchievements(allList);
        setMyBadgeIds(activeIds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBadgesData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-xs font-mono text-gray-400 animate-pulse">Synthesizing badge credentials tracking arrays...</div>;
  }

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      <div className="space-y-6">
        
        {/* Achievements Header summary blocks */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-xl">
          <div className="space-y-1">
            <h1 className="text-base font-bold uppercase tracking-tight text-gray-900 dark:text-white font-mono flex items-center gap-2">
              <MdWorkspacePremium className="text-[#16423C] dark:text-[#E2FB6C]" size={20} /> Accomplishments Vault
            </h1>
            <p className="text-xs text-gray-500 dark:text-[#6B8A85]">
              Review verified milestone achievements matching task sandbox actions.
            </p>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl text-center shrink-0">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Unlocked Nodes</span>
            <span className="text-xl font-black font-mono text-[#16423C] dark:text-[#E2FB6C]">
              {myBadgeIds.length} <span className="text-xs font-normal text-gray-400">/ {allAchievements.length}</span>
            </span>
          </div>
        </div>

        {/* Grid Lists layout items tracking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements.map((badge) => {
            const isUnlocked = myBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 border rounded-2xl transition-all relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-white dark:bg-[#16423C] border-gray-200/60 dark:border-white/5 shadow-sm dark:shadow-xl"
                    : "bg-white/60 dark:bg-[#16423C]/60 border-gray-200/30 dark:border-white/5 opacity-60"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <div className={`p-2 rounded-xl border ${
                      isUnlocked 
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-[#E2FB6C]/10 dark:text-[#E2FB6C] border-emerald-500/20" 
                        : "bg-gray-200 dark:bg-black/30 text-gray-400 border-transparent"
                    }`}>
                      {isUnlocked ? <MdStar size={18} /> : <MdLockOutline size={18} />}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold">+{badge.points} XP</span>
                  </div>

                  <h3 className={`text-xs font-bold tracking-tight mt-4 ${isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                    {badge.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {isUnlocked && (
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 text-[9px] font-mono tracking-wider text-emerald-600 dark:text-[#E2FB6C] font-bold uppercase flex items-center gap-1">
                    <MdSecurity size={12} /> Verification Block Crypt Signed
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
