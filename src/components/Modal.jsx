import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] bg-accent/60 backdrop-blur-md dark:bg-black/80"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full ${maxWidth} max-h-[90vh] bg-bg-main border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-2xl pointer-events-auto overflow-hidden flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-black/5 dark:border-white/5">
                <h3 className="text-2xl font-black tracking-tighter text-text-primary line-clamp-1">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-muted dark:bg-white/5 text-text-secondary hover:text-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
