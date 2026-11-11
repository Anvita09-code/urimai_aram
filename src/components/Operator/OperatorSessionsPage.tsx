import React, { useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  Phone,
  Play,
  Plus,
  Search,
  User,
  Users,
} from 'lucide-react';
import { OperatorSession, operatorService } from '../../services/operatorService';
import { Language } from '../../types';

interface OperatorSessionsPageProps {
  currentLang: Language;
  onSelectSession: (sessionId: string) => void;
  onNavigateSchemes: () => void;
}

export const OperatorSessionsPage: React.FC<OperatorSessionsPageProps> = ({
  currentLang,
  onSelectSession,
}) => {
  const isTamil = currentLang === 'ta';
  const [sessions, setSessions] = useState(() => operatorService.getSessions());
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);

  // New session form state
  const [newCitizenName, setNewCitizenName] = useState('');
  const [newCitizenPhone, setNewCitizenPhone] = useState('');
  const [newCitizenRation, setNewCitizenRation] = useState('');

  const filteredSessions = sessions.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.citizenName.toLowerCase().includes(q) || s.citizenNameTa.includes(q);
      const matchId = s.id.toLowerCase().includes(q);
      const matchPhone = s.phone.includes(q);
      const matchRation = s.rationCardNumber.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchPhone && !matchRation) return false;
    }
    return true;
  });

  const activeCount = sessions.filter((s) => s.status === 'active').length;
  const pausedCount = sessions.filter((s) => s.status === 'paused').length;
  const closedCount = sessions.filter((s) => s.status === 'closed').length;

  const handleCreateNewSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitizenName.trim()) return;
    const session = operatorService.createSession(
      newCitizenName.trim(),
      newCitizenPhone.trim() || '+91 98765 00000',
      newCitizenRation.trim() || '03/G/0000000'
    );
    setSessions(operatorService.getSessions());
    setIsNewSessionModalOpen(false);
    onSelectSession(session.id);
  };

  const getStatusBadge = (status: OperatorSession['status']) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          labelEn: 'In Progress',
          labelTa: 'செயலில்',
        };
      case 'paused':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          labelEn: 'Paused',
          labelTa: 'நிறுத்தி வைக்கப்பட்டுள்ளது',
        };
      case 'closed':
      default:
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          labelEn: 'Closed',
          labelTa: 'முடிக்கப்பட்டது',
        };
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3.5 pb-12 text-left select-none">
      {/* Top Welcome Section */}
      <section className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-[#145B49] font-bold text-[22px] sm:text-[24px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'உதவி மைய அமர்வுகள்' : 'Assisted Service Sessions'}
            </h1>
            <p className="text-[#59635F] text-[12.5px] mt-0.5">
              {isTamil
                ? 'நேரில் வரும் பொதுமக்களுக்கான 7-படிநிலை உதவி அமர்வுகளை நிர்வகிக்கவும்.'
                : 'Manage 7-step guided welfare sessions for visiting citizens.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsNewSessionModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#145B49] hover:bg-[#10483D] active:scale-95 text-white font-bold rounded-full text-[12.5px] shadow-xs cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.4]" />
            <span>{isTamil ? 'புதிய அமர்வு' : 'New Session'}</span>
          </button>
        </div>
      </section>

      {/* Metric Counters Banner */}
      <section className="grid grid-cols-3 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setStatusFilter('active')}
          className={`p-2.5 rounded-[16px] border text-center transition-all cursor-pointer ${
            statusFilter === 'active'
              ? 'bg-[#E8F3EB] border-[#145B49] ring-1 ring-[#145B49]'
              : 'bg-white border-[#E0E6E0] hover:bg-[#FAF7EF]'
          }`}
        >
          <span className="text-[20px] font-bold text-[#145B49] block leading-none">{activeCount}</span>
          <span className="text-[11px] font-semibold text-[#59635F] mt-1 block">
            {isTamil ? 'செயலில்' : 'Active'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('paused')}
          className={`p-2.5 rounded-[16px] border text-center transition-all cursor-pointer ${
            statusFilter === 'paused'
              ? 'bg-[#FFF8E6] border-[#A66F00] ring-1 ring-[#A66F00]'
              : 'bg-white border-[#E0E6E0] hover:bg-[#FAF7EF]'
          }`}
        >
          <span className="text-[20px] font-bold text-[#A66F00] block leading-none">{pausedCount}</span>
          <span className="text-[11px] font-semibold text-[#59635F] mt-1 block">
            {isTamil ? 'நிறுத்திவைப்பு' : 'Paused'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('closed')}
          className={`p-2.5 rounded-[16px] border text-center transition-all cursor-pointer ${
            statusFilter === 'closed'
              ? 'bg-gray-100 border-gray-600 ring-1 ring-gray-600'
              : 'bg-white border-[#E0E6E0] hover:bg-[#FAF7EF]'
          }`}
        >
          <span className="text-[20px] font-bold text-gray-700 block leading-none">{closedCount}</span>
          <span className="text-[11px] font-semibold text-[#59635F] mt-1 block">
            {isTamil ? 'முடிக்கப்பட்டது' : 'Closed'}
          </span>
        </button>
      </section>

      {/* Search & Filter Bar */}
      <section className="space-y-2 mb-3.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#69756F] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isTamil
                ? 'பெயர், குடும்ப அட்டை எண் அல்லது அமர்வு எண் தேடுக...'
                : 'Search by citizen name, ration card, or session ID...'
            }
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5D0] rounded-[14px] text-[13px] text-[#202820] placeholder:text-[#88948D] focus:outline-none focus:border-[#145B49]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'active', 'paused', 'closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#145B49] text-white'
                  : 'bg-white border border-[#D5DDD7] text-[#55645E] hover:bg-[#FAF7EF]'
              }`}
            >
              {st === 'all' ? (isTamil ? 'அனைத்தும்' : 'All') : st}
            </button>
          ))}
        </div>
      </section>

      {/* Sessions List */}
      <section className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-[18px] border border-[#E0E6E0] p-6 text-center">
            <Briefcase className="w-8 h-8 text-[#9AA6A0] mx-auto mb-2" />
            <p className="font-bold text-[14px] text-[#202820]">
              {isTamil ? 'அமர்வுகள் எதுவும் கிடைக்கவில்லை' : 'No operator sessions found'}
            </p>
            <p className="text-[12px] text-[#69756F] mt-1">
              {isTamil ? 'புதிய அமர்வைத் தொடங்க "புதிய அமர்வு" பொத்தானை அழுத்தவும்.' : 'Click "New Session" to start an assisted workflow.'}
            </p>
          </div>
        ) : (
          filteredSessions.map((s) => {
            const badge = getStatusBadge(s.status);
            return (
              <article
                key={s.id}
                onClick={() => onSelectSession(s.id)}
                className="w-full bg-white hover:bg-[#FDFCF8] rounded-[20px] p-4 border border-[#E0E6E0] shadow-2xs transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#145B49] bg-[#E8F3EB] px-2 py-0.5 rounded-full">
                    {s.id}
                  </span>

                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                    {isTamil ? badge.labelTa : badge.labelEn}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <h3 className="font-bold text-[15.5px] text-[#202820] leading-snug group-hover:text-[#145B49] transition-colors">
                      {isTamil ? s.citizenNameTa : s.citizenName}
                    </h3>
                    <p className="text-[11.5px] text-[#69756F] mt-0.5">
                      Ration: <strong>{s.rationCardNumber}</strong> • Phone: {s.phone}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-bold text-[#145B49] bg-[#FAF7EF] border border-[#DDD6C7] px-2 py-1 rounded-md block">
                      {isTamil ? `படிநிலை ${s.currentStep}/7` : `Step ${s.currentStep} of 7`}
                    </span>
                  </div>
                </div>

                {s.notes && (
                  <p className="text-[11px] text-[#55645E] bg-[#FAF7EF] p-2 rounded-[10px] mt-2.5 border border-[#ECE5D8] line-clamp-1">
                    {s.notes}
                  </p>
                )}

                <div className="mt-3 pt-2.5 border-t border-[#F0EBE0] flex items-center justify-between text-[11.5px]">
                  <span className="text-[#88948D] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isTamil ? s.createdAtTa : s.createdAt}</span>
                  </span>

                  <div className="flex items-center gap-1 font-bold text-[#145B49] group-hover:translate-x-0.5 transition-transform">
                    <span>{s.status === 'closed' ? (isTamil ? 'விவரம் காண்க' : 'View Summary') : (isTamil ? 'தொடரவும்' : 'Resume Session')}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.4]" />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Start New Session Modal */}
      {isNewSessionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] bg-white rounded-[22px] border border-[#CBD5D0] p-5 shadow-2xl animate-in zoom-in-95 text-left">
            <h2 className="font-bold text-[18px] text-[#145B49] mb-1">
              {isTamil ? 'புதிய உதவி அமர்வைத் தொடங்குக' : 'Start New Assisted Service Session'}
            </h2>
            <p className="text-[12px] text-[#59635F] mb-4">
              {isTamil
                ? 'நேரில் வந்துள்ள குடிமகனின் பெயர் மற்றும் குடும்ப அட்டை எண்ணைப் பதிவு செய்யவும்.'
                : 'Enter citizen details to initialize a guided 7-step assisted service workflow.'}
            </p>

            <form onSubmit={handleCreateNewSession} className="space-y-3 text-[12.5px]">
              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'குடிமகன் பெயர் *' : 'Citizen Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newCitizenName}
                  onChange={(e) => setNewCitizenName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[13.5px] font-medium text-[#202820] focus:outline-none focus:border-[#145B49]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'ஸ்மார்ட் குடும்ப அட்டை எண்' : 'Smart Ration Card Number'}
                </label>
                <input
                  type="text"
                  value={newCitizenRation}
                  onChange={(e) => setNewCitizenRation(e.target.value)}
                  placeholder="e.g. 03/G/0892415"
                  className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[13.5px] font-medium text-[#202820] focus:outline-none focus:border-[#145B49]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'தொடர்பு மொபைல் எண்' : 'Contact Mobile Number'}
                </label>
                <input
                  type="tel"
                  value={newCitizenPhone}
                  onChange={(e) => setNewCitizenPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[13.5px] font-medium text-[#202820] focus:outline-none focus:border-[#145B49]"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewSessionModalOpen(false)}
                  className="flex-1 py-2.5 rounded-[12px] border border-[#CBD5CF] text-[#55645E] font-semibold text-[13px] hover:bg-gray-50 cursor-pointer"
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-[12px] bg-[#145B49] hover:bg-[#10483D] text-white font-bold text-[13px] cursor-pointer shadow-xs"
                >
                  {isTamil ? 'தொடங்குக →' : 'Initialize Session →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

