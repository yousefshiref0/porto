import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMessages } from '../utils/hooks';
import { messagesService } from '../utils/supabaseClient';
import { Card } from './Card';
import { Trash2, Mail, CheckCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminMessages: React.FC = () => {
  const { messages, refetch } = useMessages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await messagesService.updateMessage(id, { is_read: !isRead });
      toast.success(!isRead ? 'Marked as read' : 'Marked as unread');
      await refetch();
    } catch (error) {
      toast.error('Error updating message');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setIsDeleting(id);
    try {
      await messagesService.deleteMessage(id);
      toast.success('Message deleted successfully!');
      await refetch();
      setSelectedId(null);
    } catch (error) {
      toast.error('Error deleting message');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const selectedMessage = messages?.find((m: any) => m.id === selectedId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-black mb-4">Messages ({messages?.length || 0})</h2>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {messages && messages.length > 0 ? (
            messages.map((msg: any) => (
              <motion.div
                key={msg.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedId(msg.id)}
                className={`p-4 border-2 cursor-pointer transition-all ${
                  selectedId === msg.id
                    ? 'border-[#4F46E5] bg-[#4F46E5]/10'
                    : msg.is_read
                    ? 'border-gray-300 bg-white hover:border-[#FF6B35]'
                    : 'border-[#FFD93D] bg-[#FFD93D]/10 font-bold'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  {msg.is_read ? (
                    <CheckCircle size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                  ) : (
                    <Circle size={16} className="text-[#FFD93D] flex-shrink-0 mt-1 fill-[#FFD93D]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-sm">{msg.name}</p>
                    <p className="text-xs text-gray-600 truncate">{msg.email}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 truncate">{msg.subject}</p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black">{selectedMessage.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail size={16} />
                      {selectedMessage.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id, selectedMessage.is_read)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title={selectedMessage.is_read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {selectedMessage.is_read ? (
                        <CheckCircle size={20} className="text-gray-400" />
                      ) : (
                        <Circle size={20} className="text-[#FFD93D] fill-[#FFD93D]" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      disabled={isDeleting === selectedMessage.id}
                      className="p-2 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} className="text-[#FF6B35]" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  {new Date(selectedMessage.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>

                <div className="border-2 border-primary p-4 rounded-lg mb-4 bg-[#111111] text-[#F8F5EC]">
                  <p className="font-bold mb-2">Subject:</p>
                  <p className="text-lg">{selectedMessage.subject || '(No subject)'}</p>
                </div>

                <div className="border-2 border-primary p-4 rounded-lg bg-white">
                  <p className="font-bold mb-2">Message:</p>
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Quick Reply Info */}
              <div className="bg-[#FFD93D]/20 border-2 border-[#FFD93D] p-4 rounded-lg">
                <p className="text-sm font-bold mb-1">💡 Quick Action:</p>
                <p className="text-sm text-gray-700">
                  You can reply to this message by{' '}
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="font-bold text-[#4F46E5] underline"
                  >
                    emailing them directly
                  </a>
                  .
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div
            className="flex items-center justify-center h-full min-h-96 border-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="text-center">
              <Mail size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 font-bold">Select a message to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
