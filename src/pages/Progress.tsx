import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TOTAL_VOTERS = 300;

export default function Progress() {
  const [totalVotes, setTotalVotes] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchTotalVotes();
    const subscription = supabase
      .channel('candidates_changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'candidates' },
        () => {
          fetchTotalVotes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTotalVotes = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('votes');
    
    if (error) {
      console.error('Error fetching votes:', error);
      return;
    }
    
    const total = data.reduce((sum, candidate) => sum + candidate.votes, 0) / 4; // Divide by 4 since each voter votes 4 times
    setTotalVotes(Math.floor(total));
    setPercentage((total / TOTAL_VOTERS) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold">Voting Progress</h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-blue-600">
                {totalVotes} / {TOTAL_VOTERS}
              </p>
              <p className="text-gray-600">Total Voters</p>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div 
                  style={{ width: `${percentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {TOTAL_VOTERS - totalVotes}
                </p>
                <p className="text-gray-600">Remaining Voters</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {totalVotes * 4}
                </p>
                <p className="text-gray-600">Total Votes Cast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}