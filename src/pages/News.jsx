import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, ArrowRight, X, AlertCircle, Newspaper, Sparkles, Clock, Share2 } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { getPosts } from '../services/api'
import { fadeInUp, staggerContainer, hoverElevate } from '../utils/animations'
import Modal from '../components/Modal'

const News = () => {
  const { data: posts, loading, error, refetch } = useFetch(getPosts)
  const [selectedPost, setSelectedPost] = useState(null)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-bg-main text-text-primary">
      {/* Header Section */}
      <div className="py-12 lg:py-16 bg-bg-subtle dark:bg-bg-subtle/30 border-b border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-orb-drift" />
        
        <div className="container-custom">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} transition={{ duration: 0.8 }}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
               <Sparkles size={12} /> News Hub
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight mb-4 text-text-primary"
              variants={fadeInUp}
            >
              Forum Stories
            </motion.h1>
            <motion.p className="text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed font-medium" variants={fadeInUp}>
              Stay updated with the latest peace initiatives and events at Samara University.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-bg-muted dark:bg-white/5 rounded-[2.5rem] animate-pulse border border-black/5 dark:border-white/5" />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                className="py-20 text-center flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mb-6">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Could not load news</h3>
                <p className="text-text-secondary mb-8 font-medium">Please check your internet connection or try again later.</p>
                <button 
                  onClick={refetch}
                  className="px-8 h-12 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  Refresh Feed
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {posts && posts.map((post) => (
                  <motion.article 
                    key={post._id} 
                    onClick={() => setSelectedPost(post)}
                    className="group relative flex flex-col bg-bg-subtle dark:bg-bg-subtle/50 border border-black/5 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    variants={fadeInUp}
                    whileHover={hoverElevate.whileHover}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-bg-muted dark:bg-white/5 flex items-center justify-center text-primary/10">
                          <Newspaper size={64} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="p-10 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-tertiary bg-bg-muted dark:bg-white/5 px-3 py-1 rounded-full">
                          <Calendar size={12} className="text-primary" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-text-primary group-hover:text-primary transition-colors mb-4 tracking-tighter leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <div 
                        className="text-text-secondary text-sm leading-relaxed mb-10 line-clamp-3 font-medium"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <User size={14} />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Admin</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary group-hover:translate-x-1 transition-transform">
                          Read Full <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* News Detail Modal */}
      <Modal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title}
        maxWidth="max-w-4xl"
      >
        {selectedPost && (
          <div className="space-y-10 pb-10">
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl">
              {selectedPost.image ? (
                <img 
                  src={selectedPost.image} 
                  className="w-full h-auto max-h-[60vh] object-cover" 
                  alt=""
                />
              ) : (
                <div className="w-full h-full bg-bg-muted flex items-center justify-center text-primary/10">
                  <Newspaper size={120} />
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                 <Calendar size={14} className="text-primary" /> {formatDate(selectedPost.createdAt)}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary text-primary">
                 <User size={14} /> SPF Editorial
              </div>
            </div>

            <div 
              className="prose prose-sm dark:prose-invert max-w-none text-text-secondary leading-relaxed font-medium space-y-4"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default News
