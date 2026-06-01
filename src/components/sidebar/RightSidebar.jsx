import { useState } from "react";
import { assets } from "../../assets/assets";

export const RightSidebar = ({ currentSong }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowingArtist, setIsFollowingArtist] = useState(true); // Default to following for the 'Unfollow' button
  const [isFollowingComposer, setIsFollowingComposer] = useState(false); // Default to not following for the 'Follow' button

  if (!currentSong) return null;

  return (
    <aside className="right-sidebar" style={{
      background: 'rgba(18, 18, 18, 0.5)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      overflowY: 'auto'
    }}>
      {/* Currently Playing Info */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{currentSong.name}</h3>
          <button 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsAdded(!isAdded)}
          >
            <img 
              src={assets.plus_icon} 
              alt="Add" 
              style={{ 
                width: '16px', 
                height: '16px',
                transform: isAdded ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.2s'
              }} 
            />
          </button>
        </div>
        <img 
          src={currentSong.image} 
          alt={currentSong.name} 
          style={{ width: '100%', aspectRatio: '1', borderRadius: '8px', objectFit: 'cover' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '4px 0' }}>{currentSong.name}</h2>
            <p style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>{currentSong.desc}</p>
          </div>
          <button 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <img 
              src={assets.like_icon} 
              alt="Like" 
              style={{ 
                width: '20px', 
                height: '20px',
                filter: isLiked ? 'brightness(0) saturate(100%) invert(56%) sepia(85%) saturate(385%) hue-rotate(95deg) brightness(92%) contrast(89%)' : 'none'
              }} 
            />
          </button>
        </div>
      </section>

      {/* About the Artist */}
      <section style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>About the artist</h4>
        <div style={{ position: 'relative', height: '120px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
          <img 
            src={currentSong.image} 
            alt="Artist" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
          <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {currentSong.desc}
            </h3>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#a7a7a7' }}>11,323,088 monthly listeners</span>
          <button 
            onClick={() => setIsFollowingArtist(!isFollowingArtist)}
            style={{ 
              border: '1px solid #fff', 
              borderRadius: '999px', 
              padding: '4px 12px', 
              background: isFollowingArtist ? 'transparent' : '#fff',
              color: isFollowingArtist ? '#fff' : '#000',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}>
            {isFollowingArtist ? 'Unfollow' : 'Follow'}
          </button>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#a7a7a7', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          Explore more tracks and albums from {currentSong.desc}. Releasing new hits in the first quarter of the year.
        </p>
      </section>

      {/* Credits */}
      <section style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Credits</h4>
          <span style={{ fontSize: '0.75rem', color: '#a7a7a7', fontWeight: 700 }}>Show all</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{currentSong.desc}</p>
            <p style={{ fontSize: '0.75rem', color: '#a7a7a7' }}>Main Artist • Composer</p>
          </div>
          <button 
            onClick={() => setIsFollowingComposer(!isFollowingComposer)}
            style={{ 
              border: '1px solid #fff', 
              borderRadius: '999px', 
              padding: '4px 12px', 
              background: isFollowingComposer ? '#fff' : 'transparent',
              color: isFollowingComposer ? '#000' : '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}>
            {isFollowingComposer ? 'Following' : 'Follow'}
          </button>
        </div>
      </section>
    </aside>
  );
};
