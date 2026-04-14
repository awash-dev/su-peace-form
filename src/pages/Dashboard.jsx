import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Tag, Plus, Upload, LayoutList as Menu, Folder, Pencil, Trash2, Download, Globe, Send, X } from 'lucide-react';
import { 
  getPosts, createPost, updatePost, deletePost, 
  getMembers, createMember, updateMember, deleteMember,
  getCategories, createCategory, deleteCategory, exportMembersCSV
} from '../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [news, setNews] = useState([]);
  const [members, setMembers] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states & Edit states
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);


  // Form states
  const [newPost, setNewPost] = useState({ title: '', content: '', author: 'Admin', category: 'General', image: null });
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', category: 'General', grade: 'Freshman', image: null, idImage: null });
  const [newCat, setNewCat] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [p, m, c] = await Promise.all([getPosts(), getMembers(), getCategories()]);
      setNews(p || []);
      setMembers(m || []);
      setChapters(c || []);
    } catch (err) {
      console.error(err);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchData();
  }, [fetchData]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <style>{`
        :root {
          --surface: #ffffff;
          --border: #e2e8f0;
          --bg-muted: #f1f5f9;
          --primary-subtle: #eff6ff;
          --input-bg: #f8fafc;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
        }
        .dark {
          --surface: #1e293b;
          --border: #334155;
          --bg-muted: #0f172a;
          --primary-subtle: rgba(59,130,246,0.1);
          --input-bg: #020617;
        }
        
    /* ── SIDEBAR LAYOUT ──────────────────── */
    .dash-layout { display:flex; min-height:100vh; }

    .dash-sidebar {
      width:240px; flex-shrink:0;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display:flex; flex-direction:column;
      position:fixed; top:0; left:0; bottom:0; z-index:50;
      transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .dash-sidebar__brand {
      display:flex; align-items:center; gap:0.75rem;
      padding:1.5rem 1.25rem 1rem;
      border-bottom:1px solid var(--border);
    }
    .dash-sidebar__logo { width:38px; height:38px; border-radius:8px; }
    .dash-sidebar__brand-name { font-weight:800; font-size:0.9375rem; color: var(--text-primary); line-height:1.2; }
    .dash-sidebar__brand-sub { font-size:0.6875rem; color: var(--text-tertiary); font-weight:600; text-transform:uppercase; letter-spacing:0.06em; }

    .dash-nav { flex:1; padding:1rem 0.75rem; display:flex; flex-direction:column; gap:0.25rem; }
    .dash-nav__item {
      display:flex; align-items:center; gap:0.75rem;
      padding:0.75rem 1rem; border-radius:0.625rem;
      color: var(--text-secondary); font-weight: 600; font-size:0.9rem;
      background:none; border:none; cursor:pointer;
      width:100%; text-align:left; font-family:inherit;
      transition:all 0.2s;
    }
    .dash-nav__item:hover { background: var(--bg-muted); color: var(--text-primary); }
    .dash-nav__item.is-active { background: var(--primary-subtle); color: var(--primary); }
    .dash-nav__icon { font-size:1.125rem; }

    .dash-sidebar__footer {
      padding:1rem 0.75rem 1.5rem;
      border-top:1px solid var(--border);
      display:flex; flex-direction:column; gap:0.25rem;
    }
    .dash-sidebar__link {
      display:block; padding:0.625rem 1rem;
      color: var(--text-tertiary); font-size:0.8125rem; font-weight:500;
      text-decoration:none; border-radius:0.5rem;
      transition:all 0.2s;
    }
    .dash-sidebar__link:hover { color: var(--text-primary); background: var(--bg-muted); }

    /* ── TOPBAR (mobile only) ──────────────── */
    .dash-topbar {
      display:none; position:fixed; top:0; left:0; right:0; height:56px;
      background: var(--surface); z-index:49;
      align-items:center; gap:0.75rem; padding:0 1rem;
      border-bottom:1px solid var(--border);
    }
    .dash-topbar__menu {
      background:none; border:none; color: var(--text-primary); font-size:1.5rem;
      cursor:pointer; padding:0.25rem; line-height:1;
    }
    .dash-topbar__brand { display:flex; align-items:center; gap:0.5rem; color: var(--text-primary); font-weight:700; font-size:0.9375rem; }

    /* ── MAIN CONTENT ──────────────────────── */
    .dash-main {
      flex:1; margin-left:240px;
      padding:2rem; min-height:100vh;
    }

    .dash-header {
      display:flex; align-items:flex-start; justify-content:space-between;
      gap:1rem; flex-wrap:wrap; margin-bottom:2rem;
    }
    .dash-header__title { font-size:1.5rem; font-weight:800; color: var(--text-primary); letter-spacing:-0.02em; margin:0 0 0.25rem; }
    .dash-header__sub { font-size:0.875rem; color: var(--text-secondary); margin:0; }

    .dash-panel { display:none; }
    .dash-panel.is-active { display:block; animation:panelIn 0.35s cubic-bezier(0.16,1,0.3,1); }
    @keyframes panelIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

    .dash-two-col {
      display:grid; grid-template-columns:1fr;
      gap:1.5rem; align-items:start;
    }
    @media (min-width:1100px) { .dash-two-col { grid-template-columns:420px 1fr; } }

    /* ── CARDS ──────────────────────────────── */
    .d-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius:1.25rem; padding:1.5rem;
      box-shadow: var(--shadow-sm);
    }
    .d-card__header { display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem; }
    .d-card__icon { font-size:1.375rem; }
    .d-card__title { font-size:1.0625rem; font-weight:800; color: var(--text-primary); margin:0; }

    /* ── FORM ELEMENTS ──────────────────────── */
    .d-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    .d-field { display:flex; flex-direction:column; gap:0.375rem; }
    .d-field.full { grid-column:1 / -1; }
    .d-label { font-size:0.8125rem; font-weight:700; color: var(--text-secondary); }
    .d-req { color:#ef4444; }
    .d-input {
      padding:0.625rem 0.875rem; border:1px solid var(--border);
      border-radius:0.625rem; font-family:inherit; font-size:0.9rem;
      color: var(--text-primary); background: var(--input-bg); outline:none; transition:all 0.2s;
      width:100%; box-sizing:border-box;
    }
    .d-input:focus { border-color: var(--primary); box-shadow:0 0 0 3px var(--primary-subtle); }
    textarea.d-input { resize:vertical; }
    .d-file-input { display:none; }
    .d-file-label {
      display:block; border:2px dashed var(--border); border-radius:0.625rem;
      padding:0.75rem 1rem; text-align:center; cursor:pointer;
      color: var(--text-tertiary); font-size:0.875rem; font-weight:600;
      transition:all 0.2s; background: var(--bg-muted);
    }
    .d-file-label:hover { border-color: var(--primary); background: var(--primary-subtle); color: var(--primary); }

    /* ── BUTTONS ────────────────────────────── */
    .d-btn {
      display:inline-flex; align-items:center; justify-content:center;
      gap:0.5rem; padding:0.625rem 1.25rem; border-radius:0.625rem;
      font-family:inherit; font-size:0.875rem; font-weight:600;
      cursor:pointer; border:none; text-decoration:none;
      transition:all 0.2s; white-space:nowrap;
    }
    .d-btn--primary { background: var(--primary); color:white; box-shadow: var(--shadow-sm); }
    .d-btn--primary:hover { background: var(--primary-light); transform:translateY(-1px); }
    .d-btn--primary:disabled { opacity:0.6; transform:none; cursor:not-allowed; }
    .d-btn--ghost { background: var(--bg-muted); color: var(--text-secondary); border:1px solid var(--border); }
    .d-btn--ghost:hover { background: var(--bg-subtle); color: var(--text-primary); }
    .d-btn--outline { background: var(--surface); color: var(--text-secondary); border:1px solid var(--border); }
    .d-btn--outline:hover { border-color: var(--primary); color: var(--primary); }
    .d-btn--danger { background: rgba(239, 68, 68, 0.1); color:#ef4444; }
    .d-btn--danger:hover { background:#ef4444; color:white; }
    .d-btn--sm { padding:0.375rem 0.75rem; font-size:0.8rem; }
    .d-btn--full { width:100%; }

    /* ── TABLE ──────────────────────────────── */
    .d-table-wrap { overflow-x:auto; }
    .d-table { width:100%; border-collapse:collapse; }
    .d-table th {
      background: var(--bg-subtle); padding:0.625rem 0.875rem;
      font-size:0.6875rem; font-weight:700; text-transform:uppercase;
      letter-spacing:0.06em; color: var(--text-tertiary);
      border-bottom:1px solid var(--border); text-align:left; white-space:nowrap;
    }
    .d-table td {
      padding:0.875rem; border-bottom:1px solid var(--border);
      font-size:0.875rem; vertical-align:middle; color: var(--text-primary);
    }
    .d-table tr:hover td { background: var(--bg-muted); }
    .d-table tr:last-child td { border-bottom:none; }
    .d-table__empty { text-align:center; padding:2rem; color: var(--text-tertiary); }

    /* ── CAT BADGE ──────────────────────────── */
    .d-badge {
      display:inline-block; padding:0.25rem 0.6rem;
      background:rgba(0,100,153,0.08); color:#006499;
      font-size:0.6875rem; font-weight:700; border-radius:9999px;
      white-space:nowrap;
    }

    .dash-sidebar__close { display: none; }
    .dash-header__actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

    /* ── MOBILE/TABLET RESPONSIVE (< 1024px) ──────────────────── */
    @media (max-width: 1023px) {
      .dash-sidebar {
        transform:translateX(-100%);
        z-index: 50; 
      }
      .dash-sidebar.is-open {
        transform:translateX(0);
        box-shadow:8px 0 40px rgba(0,0,0,0.3);
      }
      .dash-topbar { display:flex; }
      .dash-main { margin-left:0; padding:1.25rem; padding-top:calc(56px + 1.25rem); }
      .d-form-grid { grid-template-columns:1fr; }
      
      .dash-header { flex-direction: column; align-items: stretch; gap: 0.75rem; }
      .dash-header__actions { display: grid; grid-template-columns: 1fr; gap: 0.5rem; width: 100%; }
      @media (min-width: 600px) { .dash-header__actions { grid-template-columns: 1fr 1fr; } }
      .dash-header__actions .d-btn { width: 100%; font-size: 0.75rem; padding-inline: 0.5rem; }
      
      .dash-sidebar__close {
        display: flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 8px;
        background: var(--bg-muted); border: none; font-size: 1.125rem;
        cursor: pointer; margin-left: auto; color: var(--text-secondary);
      }
    }
    
    @media (max-width: 580px) {
      .dash-header__actions { display: flex; flex-direction: column; width: 100%; }
      .dash-header__actions .d-btn { width: 100%; }
    }
    


    /* ── OVERLAY for mobile sidebar ─────────── */
    .dash-overlay {
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4);
      z-index:48; backdrop-filter:blur(2px);
    }
    .dash-overlay.is-visible { display:block; }

    /* ── PRELOADER ──────────────────────────── */
    .preloader {
      position:fixed; inset:0; z-index:100; background:white;
      display:flex; align-items:center; justify-content:center;
      transition:opacity 0.5s ease;
    }
    .preloader--hidden { opacity:0; pointer-events:none; }
    .preloader__inner { position:relative; display:flex; align-items:center; justify-content:center; }
    .preloader__logo { width:48px; height:48px; border-radius:8px; }
    .preloader__ring {
      position:absolute; border-radius:50%;
      border:3px solid transparent; border-top-color:#006499;
    }
    .preloader__ring--outer { width:80px; height:80px; animation:spin 1.5s linear infinite; }
    .preloader__ring--inner { width:56px; height:56px; animation:spin 1s linear infinite reverse; }
    @keyframes spin { to { transform:rotate(360deg); } }

    /* ── TOAST ──────────────────────────────── */
    .toast-container {
      position:fixed; bottom:1.5rem; right:1.5rem;
      z-index:200; display:flex; flex-direction:column; gap:0.5rem;
    }
    .toast {
      background:white; border:1px solid #e2e8f0;
      box-shadow:0 8px 30px rgba(0,0,0,0.12);
      border-radius:0.875rem; padding:0.875rem 1.25rem;
      min-width:260px; font-size:0.875rem;
      animation:toastIn 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes toastIn { from { opacity:0; transform:translateY(0.5rem) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
  
      `}</style>

      <div className="dash-layout" style={{ margin:0, padding:0, fontFamily:'Inter, sans-serif', background:'var(--bg-main)', color:'var(--text-primary)', overflowX:'hidden' }}>
        
        {/* SIDEBAR */}
        <aside className={`dash-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
          <div className="dash-sidebar__brand">
            <img src="/logo.jpg" alt="Logo" className="dash-sidebar__logo" />
            <div>
              <div className="dash-sidebar__brand-name">Peace Forum Union</div>
              <div className="dash-sidebar__brand-sub">Admin Panel</div>
            </div>
            <button className="dash-sidebar__close" onClick={toggleSidebar} aria-label="Close sidebar"><X size={20} /></button>
          </div>

          <nav className="dash-nav">
            <button className={`dash-nav__item ${activeTab === 'news' ? 'is-active' : ''}`} onClick={() => {setActiveTab('news'); setIsSidebarOpen(false); setEditingPostId(null); setNewPost({ title: '', content: '', author: 'Admin', category: chapters[0] || 'General' });}}>
              <span className="dash-nav__icon"><Newspaper size={18} /></span> News
            </button>
            <button className={`dash-nav__item ${activeTab === 'members' ? 'is-active' : ''}`} onClick={() => {setActiveTab('members'); setIsSidebarOpen(false); setEditingMemberId(null); setNewMember({ name: '', email: '', phone: '', category: chapters[0] || 'General', grade: 'Freshman' });}}>
              <span className="dash-nav__icon"><Users size={18} /></span> Members
            </button>
            <button className={`dash-nav__item ${activeTab === 'categories' ? 'is-active' : ''}`} onClick={() => {setActiveTab('categories'); setIsSidebarOpen(false);}}>
              <span className="dash-nav__icon"><Tag size={18} /></span> Chapters
            </button>
          </nav>

          <div className="dash-sidebar__footer">
            <Link to="/" className="dash-sidebar__link" style={{display:'flex', alignItems:'center', gap:'8px'}}><Globe size={16} /> View Site</Link>
            <button onClick={exportMembersCSV} className="dash-sidebar__link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit', display:'flex', alignItems:'center', gap:'8px' }}><Download size={16} /> Export CSV</button>
          </div>
        </aside>

        {/* MOBILE TOPBAR */}
        <div className="dash-topbar">
          <button className="dash-topbar__menu" onClick={toggleSidebar}>☰</button>
          <div className="dash-topbar__brand">
            <img src="/logo.jpg" alt="Logo" width="28" height="28" style={{ borderRadius:'6px' }} />
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              <span style={{ fontWeight:800, fontSize:'0.875rem', lineHeight:1 }}>Peace Forum Union</span>
              <span style={{ fontSize:'0.625rem', fontWeight:700, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'0.04em' }}>Admin Panel</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-header__title" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                {activeTab === 'news' ? <><Newspaper size={28} /> News Management</> : activeTab === 'members' ? <><Users size={28} /> Member Registry</> : <><Tag size={28} /> Chapter Management</>}
              </h1>
              <p className="dash-header__sub">Manage {activeTab} for the public site</p>
            </div>
            <div className="dash-header__actions">
              <Link to="/" className="d-btn d-btn--ghost"><Globe size={18} /> View Site</Link>
            </div>
          </div>

          {/* NEWS PANEL */}
          <div className={`dash-panel ${activeTab === 'news' ? 'is-active' : ''}`}>
            <div className="dash-two-col">
              <div className="d-card">
                <div className="d-card__header">
                  <span className="d-card__icon">{editingPostId ? <Pencil size={24} /> : <Upload size={24} />}</span>
                  <h2 className="d-card__title">{editingPostId ? 'Edit Story' : 'Publish New Story'}</h2>
                  {editingPostId && (
                    <button className="d-btn d-btn--sm d-btn--ghost" style={{ marginLeft: 'auto' }} onClick={() => { setEditingPostId(null); setNewPost({ title: '', content: '', author: 'Admin', category: chapters[0] || 'General' }); }}>
                      <X size={14} /> Cancel
                    </button>
                  )}
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    const formData = new FormData();
                    if (newPost.image === null) formData.append('clearImage', 'true');
                    Object.keys(newPost).forEach(k => {
                      if (k === 'image') {
                        if (newPost.image) formData.append('image', newPost.image);
                      } else {
                        formData.append(k, newPost[k]);
                      }
                    });
                    if (editingPostId) {
                      await updatePost(editingPostId, formData);
                    } else {
                      await createPost(formData);
                    }
                    setNewPost({ title: '', content: '', author: 'Admin', category: chapters[0] || 'General', image: null });
                    setEditingPostId(null);
                    fetchData();
                  } catch (err) { alert(err.message) } finally { setSubmitting(false) }
                }}>
                  <div className="d-form-grid">
                    <div className="d-field full">
                      <label className="d-label">Headline <span className="d-req">*</span></label>
                      <input className="d-input" type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
                    </div>
                    <div className="d-field">
                      <label className="d-label">Author <span className="d-req">*</span></label>
                      <input className="d-input" type="text" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required />
                    </div>
                    <div className="d-field">
                      <label className="d-label">Category</label>
                      <select className="d-input" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})}>
                        {chapters.length === 0 ? <option>General</option> : chapters.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="d-field full">
                      <label className="d-label">Content <span className="d-req">*</span></label>
                      <textarea className="d-input" rows="6" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required></textarea>
                    </div>
                    <div className="d-field full">
                      <label className="d-label">Story Image</label>
                      <input type="file" onChange={e => setNewPost({...newPost, image: e.target.files[0]})} className="d-file-input" id="news-img" accept="image/*" />
                      <label htmlFor="news-img" className="d-file-label"><Upload size={18} style={{margin:'0 auto 8px', display:'block'}} /> {newPost.image?.name || 'Upload Image'}</label>
                      {newPost.image && (
                        <div className="d-preview-wrap" style={{ marginTop: '8px' }}>
                           <img src={newPost.image instanceof File ? URL.createObjectURL(newPost.image) : typeof newPost.image === 'string' ? newPost.image : ''} alt="preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />
                           <button type="button" className="d-img-delete" onClick={() => { setNewPost({...newPost, image: null}); document.getElementById('news-img').value = ''; }} title="Remove Image"><X size={12} /></button>
                        </div>
                      )}
                    </div>
                    <div className="d-field full">
                      <button type="submit" className="d-btn d-btn--primary d-btn--full" disabled={submitting}>
                        {submitting ? (editingPostId ? 'Updating...' : 'Publishing...') : (editingPostId ? <><Pencil size={18} /> Update Story</> : <><Send size={18} /> Publish to Site</>)}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="d-card">
                <div className="d-card__header">
                  <span className="d-card__icon"><Menu size={24} /></span><h2 className="d-card__title">Published Stories</h2>
                </div>
                <div className="d-table-wrap">
                  <table className="d-table">
                    <thead><tr><th>Story</th><th>Category</th><th>Date</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
                    <tbody>
                      {loading ? <tr><td colSpan="4" className="d-table__empty">Loading...</td></tr> : 
                       news.length === 0 ? <tr><td colSpan="4" className="d-table__empty">No news published yet.</td></tr> :
                       news.map(n => (
                         <tr key={n.id}>
                           <td>
                             <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                               {n.image && (
                                 <img src={n.image} alt="News" style={{width:'40px', height:'40px', borderRadius:'6px', objectFit:'cover', flexShrink:0}} />
                               )}
                               <div><div style={{fontWeight:600}}>{n.title}</div><div style={{fontSize:'0.75rem', color:'var(--text-tertiary)'}}>By {n.author}</div></div>
                             </div>
                           </td>
                           <td><span className="d-badge">{n.category}</span></td>
                           <td style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>{n.date}</td>
                           <td>
                             <div style={{display:'flex', gap:'8px', justifyContent:'flex-end'}}>
                               <button onClick={() => { setEditingPostId(n.id); setNewPost({ title: n.title, content: n.content, author: n.author, category: n.category, image: n.image }); window.scrollTo({top:0, behavior:'smooth'}); }} className="d-btn d-btn--sm d-btn--outline" title="Edit"><Pencil size={14} /></button>
                               <button onClick={() => { if(confirm('Are you sure you want to delete this story?')) deletePost(n.id).then(fetchData) }} className="d-btn d-btn--sm d-btn--danger" title="Trash"><Trash2 size={14} /></button>
                             </div>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* MEMBERS PANEL */}
          <div className={`dash-panel ${activeTab === 'members' ? 'is-active' : ''}`}>
             <div className="dash-two-col">
               <div className="d-card">
                 <div className="d-card__header">
                   <span className="d-card__icon">{editingMemberId ? <Pencil size={24} /> : <Plus size={24} />}</span>
                   <h2 className="d-card__title">{editingMemberId ? 'Edit Member' : 'Register New Member'}</h2>
                   {editingMemberId && (
                     <button className="d-btn d-btn--sm d-btn--ghost" style={{ marginLeft: 'auto' }} onClick={() => { setEditingMemberId(null); setNewMember({ name: '', email: '', phone: '', category: chapters[0] || 'General', grade: 'Freshman' }); }}>
                       <X size={14} /> Cancel
                     </button>
                   )}
                 </div>
                 <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    const formData = new FormData();
                    if (newMember.image === null) formData.append('clearImage', 'true');
                    if (newMember.idImage === null) formData.append('clearIdImage', 'true');
                    Object.keys(newMember).forEach(k => {
                      if ((k === 'image' || k === 'idImage')) {
                        if (newMember[k]) formData.append(k, newMember[k]);
                      } else {
                        formData.append(k, newMember[k]);
                      }
                    });
                    if (editingMemberId) {
                      await updateMember(editingMemberId, formData);
                    } else {
                      await createMember(formData);
                    }
                    setNewMember({ name: '', email: '', phone: '', category: chapters[0] || 'General', grade: 'Freshman', image: null, idImage: null });
                    setEditingMemberId(null);
                    fetchData();
                  } catch (err) { alert(err.message) } finally { setSubmitting(false) }
                 }}>
                   <div className="d-form-grid">
                     <div className="d-field">
                       <label className="d-label">Full Name <span className="d-req">*</span></label>
                       <input className="d-input" type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                     </div>
                     <div className="d-field">
                       <label className="d-label">Institutional Email <span className="d-req">*</span></label>
                       <input className="d-input" type="email" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required />
                     </div>
                     <div className="d-field">
                       <label className="d-label">Chapter <span className="d-req">*</span></label>
                       <select className="d-input" value={newMember.category} onChange={e => setNewMember({...newMember, category: e.target.value})}>
                          {chapters.length === 0 ? <option>General</option> : chapters.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                     </div>
                     <div className="d-field">
                       <label className="d-label">Member Photo</label>
                       <input type="file" onChange={e => setNewMember({...newMember, image: e.target.files[0]})} className="d-file-input" id="m-photo" accept="image/*" />
                       <label htmlFor="m-photo" className="d-file-label" style={{padding:'0.5rem'}}><Upload size={14} style={{verticalAlign:'middle', marginRight:'4px'}} /> {newMember.image?.name || 'Upload Photo'}</label>
                       {newMember.image && (
                         <div className="d-preview-wrap">
                           <img src={newMember.image instanceof File ? URL.createObjectURL(newMember.image) : typeof newMember.image === 'string' ? newMember.image : ''} alt="preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--border)' }} />
                           <button type="button" className="d-img-delete" style={{ top: '-4px', right: '-4px' }} onClick={() => { setNewMember({...newMember, image: null}); document.getElementById('m-photo').value = ''; }} title="Remove Photo"><X size={12} /></button>
                         </div>
                       )}
                     </div>
                     <div className="d-field">
                       <label className="d-label">Student ID Image</label>
                       <input type="file" onChange={e => setNewMember({...newMember, idImage: e.target.files[0]})} className="d-file-input" id="m-id" accept="image/*" />
                       <label htmlFor="m-id" className="d-file-label" style={{padding:'0.5rem'}}><Upload size={14} style={{verticalAlign:'middle', marginRight:'4px'}} /> {newMember.idImage?.name || 'Upload ID'}</label>
                       {newMember.idImage && (
                         <div className="d-preview-wrap">
                           <img src={newMember.idImage instanceof File ? URL.createObjectURL(newMember.idImage) : typeof newMember.idImage === 'string' ? newMember.idImage : ''} alt="preview" style={{ width: '80px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} />
                           <button type="button" className="d-img-delete" onClick={() => { setNewMember({...newMember, idImage: null}); document.getElementById('m-id').value = ''; }} title="Remove ID"><X size={12} /></button>
                         </div>
                       )}
                     </div>
                     <div className="d-field full">
                       <button type="submit" className="d-btn d-btn--primary d-btn--full" disabled={submitting}>
                         {submitting ? (editingMemberId ? 'Updating...' : 'Registering...') : (editingMemberId ? <><Pencil size={18} /> Update Registry</> : <><Plus size={18} /> Add to Registry</>)}
                       </button>
                     </div>
                   </div>
                 </form>
               </div>
               
               <div className="d-card">
                 <div className="d-card__header">
                   <span className="d-card__icon"><Users size={24} /></span><h2 className="d-card__title">Registered Members</h2>
                 </div>
                 <div className="d-table-wrap">
                  <table className="d-table">
                    <thead><tr><th>Member</th><th>Chapter</th><th>Joined</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
                    <tbody>
                      {loading ? <tr><td colSpan="4" className="d-table__empty">Loading...</td></tr> : 
                       members.length === 0 ? <tr><td colSpan="4" className="d-table__empty">No members yet.</td></tr> :
                       members.map(m => (
                         <tr key={m.id}>
                           <td>
                             <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                               {m.image && (
                                 <img src={m.image} alt="Member" style={{width:'36px', height:'36px', borderRadius:'50%', objectFit:'cover', flexShrink:0}} />
                               )}
                               <div><div style={{fontWeight:600}}>{m.name}</div><div style={{fontSize:'0.75rem', color:'var(--text-tertiary)'}}>{m.email}</div></div>
                             </div>
                           </td>
                           <td><span className="d-badge" style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>{m.category}</span></td>
                           <td style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>{m.joinedDate}</td>
                           <td>
                             <div style={{display:'flex', gap:'8px', justifyContent:'flex-end'}}>
                               <button onClick={() => { setEditingMemberId(m.id); setNewMember({ name: m.name, email: m.email, phone: m.phone || '', category: m.category, grade: m.grade || 'Freshman', image: m.image, idImage: m.idImage }); window.scrollTo({top:0, behavior:'smooth'}); }} className="d-btn d-btn--sm d-btn--outline" title="Edit"><Pencil size={14} /></button>
                               <button onClick={() => { if(confirm('Are you sure you want to remove this member?')) deleteMember(m.id).then(fetchData) }} className="d-btn d-btn--sm d-btn--danger" title="Remove"><Trash2 size={14} /></button>
                             </div>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
               </div>
             </div>
          </div>

          {/* CATEGORIES PANEL */}
          <div className={`dash-panel ${activeTab === 'categories' ? 'is-active' : ''}`}>
             <div style={{maxWidth:'640px'}}>
               <div className="d-card" style={{marginBottom:'1.5rem'}}>
                 <div className="d-card__header"><span className="d-card__icon"><Tag size={24} /></span><h2 className="d-card__title">Create New Chapter</h2></div>
                 <form onSubmit={async (e) => {
                   e.preventDefault();
                   if (!newCat.trim()) return;
                   try { await createCategory(newCat); setNewCat(''); fetchData(); } catch(err) { alert(err.message); }
                 }}>
                   <div style={{display:'flex', gap:'0.75rem'}}>
                     <input className="d-input" type="text" placeholder="Chapter name" style={{flex:1}} value={newCat} onChange={e => setNewCat(e.target.value)} required />
                     <button type="submit" className="d-btn d-btn--primary"><Plus size={18} /> Add</button>
                   </div>
                 </form>
               </div>

               <div className="d-card">
                 <div className="d-card__header"><span className="d-card__icon"><Folder size={24} /></span><h2 className="d-card__title">All Chapters</h2></div>
                 <div>
                   {loading ? <p style={{color:'#94a3b8'}}>Loading...</p> : 
                    chapters.map(c => (
                      <div key={c} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem', borderBottom:'1px solid var(--border)'}}>
                        <span style={{fontWeight:600}}>{c}</span>
                        <button onClick={() => { if(confirm('Remove this chapter?')) deleteCategory(c).then(fetchData) }} className="d-btn d-btn--sm d-btn--ghost"><Trash2 size={14} /> Remove</button>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
          </div>

        </main>
      </div>
      
      {isSidebarOpen && <div className="dash-overlay is-visible" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Dashboard;
