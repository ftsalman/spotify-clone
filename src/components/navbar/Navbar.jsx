import { useState, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import { fetchSearchSuggestions } from "../../api/musicApi";

export const Navbar = ({ onSearch, onSongSelect }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState({ songs: [], albums: [], terms: [] });
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions({ songs: [], albums: [], terms: [] });
      return;
    }
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      const results = await fetchSearchSuggestions(query);
      setSuggestions(results);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleTermClick = (term) => {
    setQuery(term);
    setShowDropdown(false);
    onSearch && onSearch(term);
  };

  const handleSongClick = (song) => {
    setShowDropdown(false);
    onSongSelect && onSongSelect(song);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    onSearch && onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <nav className="topbar" style={{ position: 'relative' }}>
      <div className="history-buttons">
        <button 
          aria-label="Go back" 
          type="button" 
          style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer' }}
          onClick={() => window.history.back()}
        >
          <img src={assets.arrow_left} alt="" />
        </button>
        <button 
          aria-label="Go forward" 
          type="button" 
          style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer' }}
          onClick={() => window.history.forward()}
        >
          <img src={assets.arrow_right} alt="" />
        </button>
      </div>

      {/* Search area with dropdown */}
      <div ref={wrapperRef} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '460px', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'grid', placeItems: 'center', flexShrink: 0, border: 'none' }}>
            <img src={assets.home_icon} alt="Home" style={{ width: '24px' }} />
          </button>
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: showDropdown ? '24px 24px 0 0' : '999px', padding: '0 16px', height: '48px', flexGrow: 1, border: '1px solid rgba(255,255,255,0.1)', transition: 'border-radius 0.15s' }}>
            <img src={assets.search_icon} alt="Search" style={{ width: '20px', marginRight: '12px', filter: 'brightness(0.7)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="What do you want to play?"
              onChange={handleInputChange}
              onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%', fontSize: '0.95rem' }}
            />
            {query && (
              <button type="button" onClick={handleClear} style={{ background: 'transparent', border: 'none', color: '#a7a7a7', fontSize: '18px', cursor: 'pointer', padding: '0 4px', flexShrink: 0 }}>✕</button>
            )}
          </form>
        </div>

        {/* ── DROPDOWN ── */}
        {showDropdown && (
          <div className="search-dropdown" style={{
            position: 'absolute',
            top: '48px',
            left: '56px',
            right: '0',
            background: '#282828',
            borderRadius: '0 0 12px 12px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            maxHeight: '480px',
            overflowY: 'auto',
            zIndex: 200,
            padding: '8px 0'
          }}>
            {/* Navigate hint */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a7a7a7', fontSize: '0.8rem' }}>
                <span style={{ border: '1px solid #555', borderRadius: '4px', padding: '1px 6px', fontSize: '0.7rem' }}>↑</span>
                <span style={{ border: '1px solid #555', borderRadius: '4px', padding: '1px 6px', fontSize: '0.7rem' }}>↓</span>
                <span>Navigate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a7a7a7', fontSize: '0.8rem' }}>
                <span style={{ border: '1px solid #555', borderRadius: '4px', padding: '1px 6px', fontSize: '0.7rem' }}>Enter</span>
                <span>Search</span>
              </div>
            </div>

            {isLoading && (
              <div style={{ padding: '24px', textAlign: 'center', color: '#a7a7a7', fontSize: '0.9rem' }}>Searching...</div>
            )}

            {/* Suggestion terms */}
            {!isLoading && suggestions.terms.map((term, i) => (
              <button
                key={`term-${i}`}
                onClick={() => handleTermClick(term)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: '100%',
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img src={assets.search_icon} alt="" style={{ width: '18px', opacity: 0.6 }} />
                <span><strong>{term}</strong></span>
              </button>
            ))}

            {/* Song results */}
            {!isLoading && suggestions.songs.length > 0 && suggestions.songs.map((song) => (
              <button
                key={`song-${song.id}`}
                onClick={() => handleSongClick(song)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '8px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img src={song.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#a7a7a7' }}>Song • {song.desc}</p>
                </div>
                <span style={{ color: 'var(--sp-green)', fontSize: '18px' }}>●</span>
              </button>
            ))}

            {/* Album results */}
            {!isLoading && suggestions.albums.length > 0 && suggestions.albums.map((album) => (
              <button
                key={`album-${album.id}`}
                onClick={() => handleTermClick(album.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '8px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img src={album.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{album.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#a7a7a7' }}>Album • {album.desc}</p>
                </div>
                <span style={{ fontSize: '18px', color: '#a7a7a7' }}>⊕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-actions">
        <button 
          aria-label="Notifications" 
          className="icon-button" 
          type="button" 
          style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer' }}
          onClick={() => alert('Notifications coming soon!')}
        >
          <img src={assets.bell_icon} alt="" />
        </button>
        <button 
          aria-label="Profile" 
          className="profile-button" 
          type="button" 
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={() => alert('Profile settings coming soon!')}
        >
          S
        </button>
      </div>
    </nav>
  );
};
