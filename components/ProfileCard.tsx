import React from 'react';
import type { ProfileData } from '../types';

interface ProfileCardProps {
  data: ProfileData;
}

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold text-white">{new Intl.NumberFormat().format(value)}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const VerifiedIcon: React.FC = () => (
    <svg viewBox="0 0 22 22" className="h-5 w-5 fill-current text-blue-500" aria-label="Verified account">
        <path d="M19.998 9.424c.224.23.34.545.34.87v.882a.87.87 0 01-.34.871l-1.127 1.157a.87.87 0 00-.26.65v1.543a.87.87 0 01-.433.774l-1.42 1.01a.87.87 0 00-.498.81v1.328a.87.87 0 01-.734.856l-1.63.31a.87.87 0 00-.69.458l-.907 1.517a.87.87 0 01-.79.47h-1.74a.87.87 0 01-.79-.47l-.908-1.517a.87.87 0 00-.69-.457l-1.63-.31a.87.87 0 01-.734-.856v-1.328a.87.87 0 00-.498-.81l-1.42-1.01a.87.87 0 01-.433-.774v-1.543a.87.87 0 00-.26-.65L2.002 12.2c-.224-.23-.34-.544-.34-.87v-.882c0-.325.116-.64.34-.87l1.127-1.158a.87.87 0 00.26-.65V6.218a.87.87 0 01.433-.774l1.42-1.01a.87.87 0 00.498-.81V2.304a.87.87 0 01.734-.856l1.63-.31a.87.87 0 00.69-.457l.908-1.518a.87.87 0 01.79-.47h1.74c.322 0 .613.176.79.47l.907 1.517a.87.87 0 00.69.458l1.63.31a.87.87 0 01.734.856v1.328a.87.87 0 00.498.81l1.42 1.01c.25.178.433.468.433.774v1.543a.87.87 0 00.26.65l1.127 1.157z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.432 7.044l-5.698 5.698-2.849-2.849a.87.87 0 00-1.23 1.23l3.464 3.464a.87.87 0 001.23 0l6.313-6.313a.87.87 0 00-1.23-1.23z" fill="#fff"></path>
    </svg>
);


const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  return (
    <div className="mt-10 w-full max-w-2xl mx-auto bg-black border border-gray-700 rounded-3xl shadow-lg shadow-purple-500/10 p-8 transition-all duration-300 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
        <img
          src={data.profilePicUrl}
          alt={`${data.username}'s profile picture`}
          className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover shadow-md"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">{data.username}</h1>
            {data.isVerified && <VerifiedIcon />}
          </div>
          <h2 className="text-lg text-gray-300">{data.fullName}</h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-b border-gray-700 py-4">
        <StatItem value={data.postsCount} label="Posts" />
        <StatItem value={data.followers} label="Followers" />
        <StatItem value={data.following} label="Following" />
      </div>

      <div className="mt-6">
        <p className="text-gray-300 whitespace-pre-wrap">{data.biography}</p>
      </div>

      {data.isPrivate && (
        <div className="mt-6 text-center text-yellow-400 bg-yellow-900/50 border border-yellow-700 rounded-lg p-3">
          This account is private.
        </div>
      )}
    </div>
  );
};

export default ProfileCard;