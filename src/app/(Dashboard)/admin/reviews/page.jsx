"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  Star,
  MessageSquare,
  User,
  MapPin,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Calendar,
  TrendingUp
} from "lucide-react";
import "../shared-styles.css";

export default function AdminReviews() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      tripTitle: 'Gorilla Trekking Adventure',
      destination: 'Volcanoes National Park',
      rating: 5,
      title: 'Amazing Experience!',
      comment: 'The gorilla trekking experience was absolutely incredible. Our guide was knowledgeable and the whole trip was well organized. Highly recommend!',
      status: 'approved',
      createdAt: '2024-01-15T10:30:00Z',
      moderatedAt: '2024-01-15T14:20:00Z',
      moderatedBy: 'Admin User',
      helpful: 12,
      reported: 0,
      agentName: 'Safari Guide Co.',
      bookingId: 'BK-2024-001'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      tripTitle: 'Lake Kivu Relaxation',
      destination: 'Lake Kivu',
      rating: 2,
      title: 'Disappointing Stay',
      comment: 'The accommodation was not as described. The room was dirty and the service was poor. Expected much better for the price paid.',
      status: 'pending',
      createdAt: '2024-01-14T14:20:00Z',
      moderatedAt: null,
      moderatedBy: null,
      helpful: 3,
      reported: 2,
      agentName: 'Lakeside Tours',
      bookingId: 'BK-2024-002'
    },
    {
      id: '3',
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com',
      tripTitle: 'Nyungwe Forest Canopy Walk',
      destination: 'Nyungwe Forest',
      rating: 4,
      title: 'Great Forest Experience',
      comment: 'The canopy walk was thrilling and the forest is beautiful. Guide was very informative about the wildlife. Only minor issue was the transportation delay.',
      status: 'approved',
      createdAt: '2024-01-13T09:15:00Z',
      moderatedAt: '2024-01-13T11:30:00Z',
      moderatedBy: 'Admin User',
      helpful: 8,
      reported: 0,
      agentName: 'Forest Adventures',
      bookingId: 'BK-2024-003'
    },
    {
      id: '4',
      customerName: 'Emma Chen',
      customerEmail: 'emma@example.com',
      tripTitle: 'Kigali City Tour',
      destination: 'Kigali',
      rating: 1,
      title: 'Terrible Experience - Inappropriate Content',
      comment: 'This review contains inappropriate language and offensive content that violates our community guidelines. [Content flagged for moderation]',
      status: 'rejected',
      createdAt: '2024-01-12T16:45:00Z',
      moderatedAt: '2024-01-12T17:00:00Z',
      moderatedBy: 'Admin User',
      helpful: 0,
      reported: 5,
      agentName: 'City Tours Rwanda',
      bookingId: 'BK-2024-004'
    }
  ]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // GET /admin/reviews
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, update reviews from API
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModerateReview = async (reviewId, action, reason = '') => {
    try {
      // PUT /admin/reviews/:id/moderate
      console.log(`Moderating review ${reviewId}: ${action}`, reason);

      const newStatus = action === 'approve' ? 'approved' : 'rejected';

      setReviews(prev => prev.map(review =>
        review.id === reviewId
          ? {
            ...review,
            status: newStatus,
            moderatedAt: new Date().toISOString(),
            moderatedBy: user?.name || 'Admin User'
          }
          : review
      ));
    } catch (error) {
      console.error('Failed to moderate review:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      console.log(`Performing bulk action: ${action} on reviews:`, selectedReviews);

      if (action === 'approve') {
        selectedReviews.forEach(reviewId => {
          handleModerateReview(reviewId, 'approve');
        });
      } else if (action === 'reject') {
        selectedReviews.forEach(reviewId => {
          handleModerateReview(reviewId, 'reject');
        });
      }

      setSelectedReviews([]);
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.tripTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;

    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: MessageSquare },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const getAverageRating = () => {
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    if (approvedReviews.length === 0) return 0;

    const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / approvedReviews.length).toFixed(1);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
              <p className="text-gray-600 mt-1">Moderate and manage customer reviews</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={fetchReviews}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageRating()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reported</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.reported > 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {selectedReviews.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedReviews.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReviews(prev => [...prev, review.id]);
                      } else {
                        setSelectedReviews(prev => prev.filter(id => id !== review.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                        {getStatusBadge(review.status)}
                        {review.reported > 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Flag className="w-3 h-3 mr-1" />
                            {review.reported} reports
                          </span>
                        )}
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{review.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{review.destination}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Trip: {review.tripTitle}</p>
                      <p className="text-sm text-gray-600">Agent: {review.agentName}</p>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{review.helpful} helpful</span>
                      </div>
                      <span>Booking: {review.bookingId}</span>
                      {review.moderatedBy && (
                        <span>Moderated by: {review.moderatedBy}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {review.status === 'pending' && (
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => console.log('View details:', review.id)}
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>

                  <button
                    onClick={() => handleModerateReview(review.id, 'reject')}
                    className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </button>

                  <button
                    onClick={() => handleModerateReview(review.id, 'approve')}
                    className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-500">No reviews match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
