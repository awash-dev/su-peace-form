const fs = require('fs');

const html = fs.readFileSync('temp_html.txt', 'utf8');

// Extract the CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const cssContent = styleMatch ? styleMatch[1] : '';

// Manually build the Dashboard.jsx string
const dashboardJsx = `import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

  // Form states
  const [newPost, setNewPost] = useState({ title: '', content: '', author: 'Admin', category: 'General' });
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', category: 'General', grade: 'Freshman' });
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
      <style>{\`
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
        \${cssContent || ''}
      \`}</style>

      <div className="dash-layout" style={{ margin:0, padding:0, fontFamily:'Inter, sans-serif', background:'var(--bg-main)', color:'var(--text-primary)', overflowX:'hidden' }}>
        
        {/* SIDEBAR */}
        <aside className={\`dash-sidebar \${isSidebarOpen ? 'is-open' : ''}\`}>
          <div className="dash-sidebar__brand">
            <img src="/logo.jpg" alt="Logo" className="dash-sidebar__logo" />
            <div>
              <div className="dash-sidebar__brand-name">Peace Forum Union</div>
              <div className="dash-sidebar__brand-sub">Admin Panel</div>
            </div>
            <button className="dash-sidebar__close" onClick={toggleSidebar} aria-label="Close sidebar">✕</button>
          </div>

          <nav className="dash-nav">
            <button className={\`dash-nav__item \${activeTab === 'news' ? 'is-active' : ''}\`} onClick={() => {setActiveTab('news'); setIsSidebarOpen(false);}}>
              <span className="dash-nav__icon">📰</span> News
            </button>
            <button className={\`dash-nav__item \${activeTab === 'members' ? 'is-active' : ''}\`} onClick={() => {setActiveTab('members'); setIsSidebarOpen(false);}}>
              <span className="dash-nav__icon">👥</span> Members
            </button>
            <button className={\`dash-nav__item \${activeTab === 'categories' ? 'is-active' : ''}\`} onClick={() => {setActiveTab('categories'); setIsSidebarOpen(false);}}>
              <span className="dash-nav__icon">🏷</span> Chapters
            </button>
          </nav>

          <div className="dash-sidebar__footer">
            <Link to="/" className="dash-sidebar__link">🌐 View Site</Link>
            <button onClick={exportMembersCSV} className="dash-sidebar__link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>📥 Export CSV</button>
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
              <h1 className="dash-header__title">
                {activeTab === 'news' ? '📰 News Management' : activeTab === 'members' ? '👥 Member Registry' : '🏷 Chapter Management'}
              </h1>
              <p className="dash-header__sub">Manage {activeTab} for the public site</p>
            </div>
            <div className="dash-header__actions">
              <Link to="/" className="d-btn d-btn--ghost">← View Site</Link>
            </div>
          </div>

          {/* NEWS PANEL */}
          <div className={\`dash-panel \${activeTab === 'news' ? 'is-active' : ''}\`}>
            <div className="dash-two-col">
              <div className="d-card">
                <div className="d-card__header">
                  <span className="d-card__icon">📤</span>
                  <h2 className="d-card__title">Publish New Story</h2>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    const formData = new FormData();
                    Object.keys(newPost).forEach(k => formData.append(k, newPost[k]));
                    await createPost(formData);
                    setNewPost({ title: '', content: '', author: 'Admin', category: chapters[0] || 'General' });
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
                      <button type="submit" className="d-btn d-btn--primary d-btn--full" disabled={submitting}>
                        {submitting ? 'Publishing...' : '📤 Publish to Site'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="d-card">
                <div className="d-card__header">
                  <span className="d-card__icon">📋</span><h2 className="d-card__title">Published Stories</h2>
                </div>
                <div className="d-table-wrap">
                  <table className="d-table">
                    <thead><tr><th>Story</th><th>Category</th><th>Date</th><th></th></tr></thead>
                    <tbody>
                      {loading ? <tr><td colSpan="4" className="d-table__empty">Loading...</td></tr> : 
                       news.length === 0 ? <tr><td colSpan="4" className="d-table__empty">No news published yet.</td></tr> :
                       news.map(n => (
                         <tr key={n.id}>
                           <td><div style={{fontWeight:600}}>{n.title}</div><div style={{fontSize:'0.75rem', color:'var(--text-tertiary)'}}>By {n.author}</div></td>
                           <td><span className="d-badge">{n.category}</span></td>
                           <td style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>{n.date}</td>
                           <td><button onClick={() => deletePost(n.id).then(fetchData)} className="d-btn d-btn--sm d-btn--danger">Trash</button></td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* MEMBERS PANEL */}
          <div className={\`dash-panel \${activeTab === 'members' ? 'is-active' : ''}\`}>
             <div className="dash-two-col">
               <div className="d-card">
                 <div className="d-card__header">
                   <span className="d-card__icon">➕</span><h2 className="d-card__title">Register New Member</h2>
                 </div>
                 <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    const formData = new FormData();
                    Object.keys(newMember).forEach(k => formData.append(k, newMember[k]));
                    await createMember(formData);
                    setNewMember({ name: '', email: '', phone: '', category: chapters[0] || 'General', grade: 'Freshman' });
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
                     <div className="d-field full">
                       <button type="submit" className="d-btn d-btn--primary d-btn--full" disabled={submitting}>
                         {submitting ? 'Registering...' : '➕ Add to Registry'}
                       </button>
                     </div>
                   </div>
                 </form>
               </div>
               
               <div className="d-card">
                 <div className="d-card__header">
                   <span className="d-card__icon">📋</span><h2 className="d-card__title">Registered Members</h2>
                 </div>
                 <div className="d-table-wrap">
                  <table className="d-table">
                    <thead><tr><th>Member</th><th>Chapter</th><th>Joined</th><th></th></tr></thead>
                    <tbody>
                      {loading ? <tr><td colSpan="4" className="d-table__empty">Loading...</td></tr> : 
                       members.length === 0 ? <tr><td colSpan="4" className="d-table__empty">No members yet.</td></tr> :
                       members.map(m => (
                         <tr key={m.id}>
                           <td><div style={{fontWeight:600}}>{m.name}</div><div style={{fontSize:'0.75rem', color:'var(--text-tertiary)'}}>{m.email}</div></td>
                           <td><span className="d-badge" style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>{m.category}</span></td>
                           <td style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>{m.joinedDate}</td>
                           <td><button onClick={() => deleteMember(m.id).then(fetchData)} className="d-btn d-btn--sm d-btn--danger">Remove</button></td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
               </div>
             </div>
          </div>

          {/* CATEGORIES PANEL */}
          <div className={\`dash-panel \${activeTab === 'categories' ? 'is-active' : ''}\`}>
             <div style={{maxWidth:'640px'}}>
               <div className="d-card" style={{marginBottom:'1.5rem'}}>
                 <div className="d-card__header"><span className="d-card__icon">🏷</span><h2 className="d-card__title">Create New Chapter</h2></div>
                 <form onSubmit={async (e) => {
                   e.preventDefault();
                   if (!newCat.trim()) return;
                   try { await createCategory(newCat); setNewCat(''); fetchData(); } catch(err) { alert(err.message); }
                 }}>
                   <div style={{display:'flex', gap:'0.75rem'}}>
                     <input className="d-input" type="text" placeholder="Chapter name" style={{flex:1}} value={newCat} onChange={e => setNewCat(e.target.value)} required />
                     <button type="submit" className="d-btn d-btn--primary">➕ Add</button>
                   </div>
                 </form>
               </div>

               <div className="d-card">
                 <div className="d-card__header"><span className="d-card__icon">📂</span><h2 className="d-card__title">All Chapters</h2></div>
                 <div>
                   {loading ? <p style={{color:'#94a3b8'}}>Loading...</p> : 
                    chapters.map(c => (
                      <div key={c} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem', borderBottom:'1px solid var(--border)'}}>
                        <span style={{fontWeight:600}}>{c}</span>
                        <button onClick={() => deleteCategory(c).then(fetchData)} className="d-btn d-btn--sm d-btn--ghost">Remove</button>
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
`;

fs.writeFileSync('src/pages/Dashboard.jsx', dashboardJsx);
console.log('Dashboard written');
