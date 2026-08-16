import React from 'react';
import { ArrowLeft, AlertCircle, Shield, Home } from 'lucide-react';
import { Language, ActiveView } from '../types';

interface NotFoundPageProps {
  onNavigate: (view: ActiveView) => void;
  onOpenEmergency: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-6">
        <Shield className="w-8 h-8 stroke-[2.5]" />
      </div>

      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
        Looks like this page isn't here.
      </h1>

      <p className="text-sm text-slate-600 mb-8">
        The legal guide or section you are looking for may have moved or does not exist. Choose an option below to get immediate assistance:
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={onOpenEmergency}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center space-x-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span>View Emergency Guide</span>
        </button>
      </div>
    </div>
  );
};
