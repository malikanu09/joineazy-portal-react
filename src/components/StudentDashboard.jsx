import React, { useState } from 'react';

export default function StudentDashboard({ currentUser, assignments, submissions, onUpdateSubmission }) {
  const [selectedAsg, setSelectedAsg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const myAssignments = assignments.filter(asg => asg.assignedTo.includes(currentUser.id));
  const totalAssigned = myAssignments.length;
  const totalSubmitted = myAssignments.filter(asg => submissions[asg.id]?.[currentUser.id] === 'submitted').length;
  const progressPercent = totalAssigned > 0 ? Math.round((totalSubmitted / totalAssigned) * 100) : 0;

  const handleConfirmSubmit = () => {
    if (selectedAsg) {
      onUpdateSubmission(selectedAsg.id, currentUser.id, 'submitted');
      setShowConfirmModal(false);
      setSelectedAsg(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Progress Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Your Submission Progress</h2>
            <p className="text-xs text-slate-500">Track your completed assignments</p>
          </div>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {totalSubmitted} of {totalAssigned} submitted ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Assignments</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myAssignments.map((asg) => {
          const isSubmitted = submissions[asg.id]?.[currentUser.id] === 'submitted';
          return (
            <div key={asg.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    isSubmitted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {isSubmitted ? 'Submitted' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{asg.description}</p>
                <div className="text-xs text-slate-500 mb-4 space-y-1">
                  <p><span className="font-semibold text-slate-700">Due Date:</span> {new Date(asg.dueDate).toLocaleString()}</p>
                </div>
                {asg.driveLink && (
                  <a
                    href={asg.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 mb-4"
                  >
                    📎 View Task Reference Link ↗
                  </a>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                {!isSubmitted ? (
                  <button
                    onClick={() => { setSelectedAsg(asg); setShowConfirmModal(true); }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-sm"
                  >
                    Submit Assignment
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-400 font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed border border-slate-200"
                  >
                    Already Submitted ✓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Submission</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to mark <span className="font-semibold text-slate-800">"{selectedAsg?.title}"</span> as submitted?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm"
              >
                Yes, I have submitted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}