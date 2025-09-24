import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Award } from 'lucide-react';
import styles from './InteractiveFeedback.module.css';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface InteractiveFeedbackProps {
  totalCustomizations: number;
  templatesUsed: number;
  accessoriesAdded: number;
}

const InteractiveFeedback: React.FC<InteractiveFeedbackProps> = ({
  totalCustomizations,
  templatesUsed,
  accessoriesAdded,
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-design',
      title: 'Designer Debut',
      description: 'Create your first custom plushie',
      icon: <Star size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'color-explorer',
      title: 'Color Explorer',
      description: 'Try 5 different colors',
      icon: <Sparkles size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
    },
    {
      id: 'accessory-lover',
      title: 'Accessory Lover',
      description: 'Add 3 accessories to your plushie',
      icon: <Heart size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 3,
    },
    {
      id: 'master-crafter',
      title: 'Master Crafter',
      description: 'Complete 5 customizations',
      icon: <Award size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
    },
  ]);

  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    setAchievements(prev => 
      prev.map(achievement => {
        const oldProgress = achievement.progress;
        let newProgress = oldProgress;

        switch (achievement.id) {
          case 'first-design':
            newProgress = Math.min(totalCustomizations, achievement.maxProgress);
            break;
          case 'color-explorer':
            // This would be tracked when color changes happen
            break;
          case 'accessory-lover':
            newProgress = Math.min(accessoriesAdded, achievement.maxProgress);
            break;
          case 'master-crafter':
            newProgress = Math.min(totalCustomizations, achievement.maxProgress);
            break;
        }

        const wasUnlocked = achievement.unlocked;
        const isNowUnlocked = newProgress >= achievement.maxProgress;

        // Check for new achievement unlock
        if (!wasUnlocked && isNowUnlocked) {
          const newAchievement = { ...achievement, progress: newProgress, unlocked: true };
          setNewAchievements(prev => [...prev, newAchievement]);
          setShowAchievement(true);
          
          setTimeout(() => setShowAchievement(false), 4000);
        }

        return {
          ...achievement,
          progress: newProgress,
          unlocked: isNowUnlocked,
        };
      })
    );
  }, [totalCustomizations, templatesUsed, accessoriesAdded]);

  const getEncouragementMessage = () => {
    const messages = [
      "🎨 You're doing amazing! Your plushie is going to be adorable!",
      "✨ Great choices! This plushie will bring so much joy!",
      "🌟 Looking fantastic! Almost ready for your perfect cuddle buddy!",
      "💝 Beautiful customization! Someone's going to love this!",
      "🎉 Excellent work! Your creativity is shining through!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const [encouragement, setEncouragement] = useState(getEncouragementMessage());

  useEffect(() => {
    const interval = setInterval(() => {
      setEncouragement(getEncouragementMessage());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.interactiveFeedback}>
      {/* Encouragement Messages */}
      <div className={styles.encouragementContainer}>
        <div className={styles.encouragementMessage} key={encouragement}>
          {encouragement}
        </div>
      </div>

      {/* Progress Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.stat}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statText}>
            <span className={styles.statNumber}>{totalCustomizations}</span>
            <span className={styles.statLabel}>Designs</span>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statIcon}>👑</div>
          <div className={styles.statText}>
            <span className={styles.statNumber}>{achievements.filter(a => a.unlocked).length}</span>
            <span className={styles.statLabel}>Achievements</span>
          </div>
        </div>
      </div>

      {/* Achievement Popup */}
      {showAchievement && newAchievements.length > 0 && (
        <div className={styles.achievementPopup}>
          <div className={styles.achievementContent}>
            <div className={styles.achievementHeader}>
              <div className={styles.achievementIcon}>
                {newAchievements[newAchievements.length - 1].icon}
              </div>
              <div className={styles.achievementText}>
                <h3>Achievement Unlocked!</h3>
                <h4>{newAchievements[newAchievements.length - 1].title}</h4>
                <p>{newAchievements[newAchievements.length - 1].description}</p>
              </div>
            </div>
            <div className={styles.achievementGlow} />
          </div>
        </div>
      )}

      {/* Mini Achievement Progress */}
      <div className={styles.achievementsMini}>
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`${styles.achievementMini} ${
              achievement.unlocked ? styles.unlocked : styles.locked
            }`}
            title={`${achievement.title}: ${achievement.description} (${achievement.progress}/${achievement.maxProgress})`}
          >
            <div className={styles.achievementMiniIcon}>
              {achievement.icon}
            </div>
            <div className={styles.achievementMiniProgress}>
              <div 
                className={styles.achievementMiniProgressFill}
                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveFeedback;