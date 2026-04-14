import { motion } from 'framer-motion'
import { FileText, Download, Link as LinkIcon, BookOpen, AlertCircle, Sparkles, ExternalLink } from 'lucide-react'
import { fadeInUp, fadeInDown, staggerContainer, hoverElevate } from '../utils/animations'

const Resources = () => {
  const resourceGroups = [
    {
      title: 'Official Documents',
      items: [
        { name: 'SPF Charter 2024', type: 'PDF', size: '1.2 MB' },
        { name: 'Code of Conduct', type: 'PDF', size: '0.8 MB' },
        { name: 'Mediation Guide', type: 'PDF', size: '2.4 MB' }
      ]
    },
    {
      title: 'Learning Tools',
      items: [
        { name: 'Peace Building 101', type: 'PDF', size: '4.5 MB' },
        { name: 'Workshop Kit', type: 'ZIP', size: '12 MB' }
      ]
    }
  ]

  return (
    <div className="pt-16 lg:pt-20 bg-bg-main text-text-primary min-h-screen">
      {/* PAGE HERO */}
      <div className="relative py-12 lg:py-20 overflow-hidden bg-bg-subtle/30 border-b border-black/5 dark:border-white/10">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-orb-drift" />
        
        <div className="container-custom relative z-10">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
               <Sparkles size={12} /> Knowledge Base
            </motion.div>
            <motion.h1 className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight mb-6 text-text-primary" variants={fadeInUp}>
              Institutional <br/><span className="text-primary italic">Resources</span>
            </motion.h1>
            <motion.p className="text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed font-medium" variants={fadeInUp}>
              Access official SPF charters, mediation guides, and regional peacebuilding materials.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {resourceGroups.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-8">
                <motion.h2 
                  className="text-2xl font-black tracking-tighter text-text-primary flex items-center gap-3" 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                >
                   <div className="w-1.5 h-6 bg-primary rounded-full"/> {group.title}
                </motion.h2>
                <motion.div 
                  className="flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {group.items.map((item, iIdx) => (
                    <motion.div 
                      key={iIdx}
                      className="group flex items-center gap-6 p-6 bg-bg-subtle dark:bg-bg-subtle/50 border border-black/5 dark:border-white/10 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500"
                      variants={fadeInUp}
                      whileHover={hoverElevate.whileHover}
                    >
                      <div className="w-14 h-14 bg-bg-main dark:bg-white/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        {item.type === 'PDF' ? <FileText size={24} /> : <BookOpen size={24} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-tertiary mb-1">{item.type} · {item.size}</p>
                        <p className="text-base font-black text-text-primary group-hover:text-primary transition-colors">{item.name}</p>
                      </div>
                      <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-muted dark:bg-white/10 text-text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Download size={18} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Links - Fixed Dark Mode Contrast */}
      <section className="py-20 lg:py-32 bg-bg-subtle dark:bg-bg-subtle/30 border-y border-black/5 dark:border-white/10">
        <div className="container-custom">
          <motion.div 
            className="p-12 lg:p-20 bg-bg-main dark:bg-bg-subtle/50 rounded-[3.5rem] border border-black/5 dark:border-white/10 text-center shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-3xl lg:text-4xl font-black text-text-primary mb-8 tracking-tighter">University Portals</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Ministry of Education', url: '#' },
                { name: 'Samara Research Inst.', url: '#' },
                { name: 'Student Affairs', url: '#' }
              ].map((link, lIdx) => (
                <a 
                  key={lIdx}
                  href={link.url} 
                  className="h-14 px-8 flex items-center justify-center gap-3 bg-bg-muted dark:bg-white/5 border border-black/5 dark:border-white/10 text-text-primary font-black rounded-2xl shadow-sm hover:scale-105 hover:bg-primary hover:text-white hover:border-primary transition-all text-[11px] uppercase tracking-widest"
                >
                  <LinkIcon size={18} /> {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Resources
