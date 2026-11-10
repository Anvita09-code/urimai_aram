import React from 'react';
import { Bell, Check, Clock, X } from 'lucide-react';
import { Language } from '../../../types';

export interface CitizenNotification {
  id: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  timeEn: string;
  timeTa: string;
  read: boolean;
  type: 'scheme' | 'document' | 'reminder';
}

interface NotificationDrawerProps {
  isOpen: boolean;
  currentLang: Language;
  notifications: CitizenNotification[];
  onMarkAllRead: () => void;
  onSelectNotification: (id: string) => void;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  currentLang,
  notifications,
  onMarkAllRead,
  onSelectNotification,
  onClose,
}) => {
  if (!isOpen) return null;
  const isTamil = currentLang === 'ta';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200 max-h-[90vh] flex flex-col">
        {/* Mobile handle */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE5D8] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D]">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? 'அறிவிப்புகள்' : 'Notifications'}
              </h2>
              <span className="text-[12px] text-[#626A62]">
                {isTamil ? 'அரசு நலத்திட்ட புதுப்பிப்புகள்' : 'Welfare scheme announcements & alerts'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mark All Read button */}
        <div className="flex justify-end pt-2 shrink-0">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-[12px] font-bold text-[#155B4D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isTamil ? 'அனைத்தையும் வாசித்ததாக குறிக்க' : 'Mark all as read'}</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 py-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectNotification(n.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-white border-[#ECE5D8] opacity-80'
                  : 'bg-white border-[#155B4D]/40 shadow-2xs relative'
              }`}
            >
              {!n.read && (
                <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#F5D879] ring-2 ring-white" />
              )}
              <h4 className="text-[13.5px] font-bold text-[#155B4D] pr-4">
                {isTamil ? n.titleTa : n.titleEn}
              </h4>
              <p className="text-[12px] text-[#555C58] mt-1 leading-snug">
                {isTamil ? n.descTa : n.descEn}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#88908A] mt-2">
                <Clock className="w-3 h-3" />
                <span>{isTamil ? n.timeTa : n.timeEn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="pt-3 border-t border-[#ECE5D8] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#155B4D] hover:bg-[#11493e] text-white font-bold text-[13.5px] rounded-xl active:scale-98 transition-all shadow-xs"
          >
            {isTamil ? 'மூடுக' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
