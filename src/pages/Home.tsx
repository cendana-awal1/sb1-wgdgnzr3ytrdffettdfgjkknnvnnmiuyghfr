import React, { useState,useRef,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Vote, BarChart } from 'lucide-react';

export default function Home() {
  const [voterId, setVoterId] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voterId.trim()==='246817') {
      localStorage.setItem('voterId', voterId);
      localStorage.setItem('votesLeft', '4'); // Updated to 4
      navigate('/vote');
    }
    else if(voterId.trim()==='1357908642'){
      navigate('/results');
    }
    else if( voterId.trim()==='1234567892') {
      navigate('/progress');
    }
    else{
      alert('Invalid Voter Number');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://pgrikotasemarang.org/assets/upload/image/Logo.jpg"
            alt=""
            width="200"
          />
          {/* <Vote className="w-12 h-12 text-blue-600" /> */}
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">
          E-Voting Formatur System
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="voterId"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your Voter ID
            </label>
            <input
            ref={inputRef}
              type="text"
              id="voterId"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Voting
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          {/* <Link
            to="/results"
            className="flex items-center justify-center text-blue-600 hover:text-blue-800"
          >
            <BarChart className="w-5 h-5 mr-2" />
            View Results
          </Link> */}
        </div>
      </div>
    </div>
  );
}
