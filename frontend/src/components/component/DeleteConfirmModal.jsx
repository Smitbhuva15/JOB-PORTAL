import React from 'react';
import { Button } from '../ui/button';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, description, isDeleting }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border p-6 z-[101]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold font-heading text-foreground mb-2">
                {title || 'Are you absolutely sure?'}
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                {description || 'This action cannot be undone. This will permanently delete the data from our servers.'}
              </p>

              <div className="flex gap-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={onClose}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  variant="destructive" 
                  className="w-full h-11 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm" 
                  onClick={onConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Confirm'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
