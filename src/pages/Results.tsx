import React, { useEffect, useState } from 'react';
import { BarChart, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

export default function Results() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('votes', { ascending: false });
    
    if (error) {
      console.error('Error fetching results:', error);
      return;
    }
    
    setCandidates(data || []);
    setTotalVotes(data?.reduce((sum, candidate) => sum + candidate.votes, 0) || 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <BarChart className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold">Voting Results</h1>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-center text-gray-600">
              Total Votes Cast: <span className="font-bold">{totalVotes}</span>
            </p>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate) => {
              const percentage = totalVotes > 0 
                ? ((candidate.votes / totalVotes) * 100).toFixed(1) 
                : '0';
              
              return (
                <div key={candidate.id} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{candidate.name}</span>
                    <span className="text-gray-600">
                      {candidate.votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}