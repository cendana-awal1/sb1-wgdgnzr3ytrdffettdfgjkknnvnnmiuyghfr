import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CandidateCard from '../components/CandidateCard';

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

export default function Vote() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [votesLeft, setVotesLeft] = useState(
    Number(localStorage.getItem('votesLeft')) || 4
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching candidates:', error);
      return;
    }

    setCandidates(data || []);
  };

  const handleVote = async (candidateId: string) => {
    if (votedIds.includes(candidateId)) return;

    const newVotesLeft = votesLeft - 1;
    setVotesLeft(newVotesLeft);
    setVotedIds([...votedIds, candidateId]);
    localStorage.setItem('votesLeft', String(newVotesLeft));

    const { error } = await supabase
      .from('candidates')
      .update({
        votes: candidates.find((c) => c.id === candidateId)!.votes + 1,
      })
      .eq('id', candidateId);

    if (error) {
      console.error('Error updating vote:', error);
      return;
    }

    if (newVotesLeft === 0) {
      alert('Terima kasih telah memilih!');
      localStorage.removeItem('voterId');
      localStorage.removeItem('votesLeft');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 ">
      <div className="max-w-8xl mx-auto">
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Choose Your Candidates</h1>
            {/* <Link
              to="/results"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <BarChart className="w-5 h-5 mr-2" />
              View Results
            </Link> */}
          </div>

          <p className="text-center mb-6 text-gray-600">
            Please select <span className="font-bold">{votesLeft}</span> more
            candidate{votesLeft !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                name={candidate.name}
                isVoted={votedIds.includes(candidate.id)}
                isDisabled={votesLeft === 0 && !votedIds.includes(candidate.id)}
                onVote={() => handleVote(candidate.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
