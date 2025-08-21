'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, useDashboardStats, useBookings } from '../../../hooks/useApi';
import {
  LoadingSpinner,
  ErrorMessage,
  RetryButton
} from '../../../components/common/ApiComponents';
import {
  StatCard,
  ChartCard,
  DataTable,
  StatusBadge,
  QuickActionCard,
  ActivityFeed,
  EmptyState
} from '../../../components/dashboard/DashboardComponents';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Plus,
  UserPlus,
  FileText,
  Award,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart,
  Target,
  Phone,
  Mail
} from 'lucide-react';

export default function AgentDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [dateRange, setDateRange] = useState('month');
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch agent dashboard statistics
  const {
    data: agentStats,
    loading: statsLoading,
    error: statsError,
    refresh: refreshStats
  } = useDashboardStats({
    period: dateRange,
    key: refreshKey,
    userType: 'agent'
  });

  // Fetch agent's bookings
  const {
    data: agentBookings,
    loading: bookingsLoading,
    error: bookingsError
  } = useBookings({
    agentId: user?.id,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Check authentication and permissions
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'agent')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refreshStats();
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  // Format currency helper
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount || 0);
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (authLoading || (!isAuthenticated || user?.role !== 'agent')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName || 'Agent'}</p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <RetryButton
              onRetry={handleRefresh}
              loading={statsLoading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Error handling */}
        {statsError && (
          <ErrorMessage
            error={statsError}
            onRetry={handleRefresh}
            className="mb-6"
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Clients"
            value={agentStats?.totalClients || 0}
            change={`+${agentStats?.clientsChange || 0}%`}
            changeType="positive"
            icon={Users}
            color="blue"
            loading={statsLoading}
          />
          <StatCard
            title="Active Bookings"
            value={agentStats?.activeBookings || 0}
            change={`+${agentStats?.bookingsChange || 0}%`}
            changeType="positive"
            icon={Calendar}
            color="green"
            loading={statsLoading}
          />
          <StatCard
            title="Total Commission"
            value={formatCurrency(agentStats?.totalCommission || 0)}
            change={`+${agentStats?.commissionChange || 0}%`}
            changeType="positive"
            icon={DollarSign}
            color="purple"
            loading={statsLoading}
          />
          <StatCard
            title="Performance Score"
            value={`${agentStats?.performanceScore || 0}%`}
            change={`+${agentStats?.performanceChange || 0}%`}
            changeType="positive"
            icon={Target}
            color="orange"
            loading={statsLoading}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Commission Trends"
            loading={statsLoading}
            actions={
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Commission trends chart will be displayed here</p>
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Client Distribution"
            loading={statsLoading}
            actions={
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            }
          >
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Client distribution chart will be displayed here</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Recent Bookings Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Recent Bookings</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Bookings
            </button>
          </div>

          {agentBookings?.data?.length > 0 ? (
            <DataTable
              columns={[
                {
                  header: 'Client',
                  key: 'clientName',
                  render: (value, row) => (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-green-600">
                          {value?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                        <div className="text-sm text-gray-500">{row.clientEmail}</div>
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Tour',
                  key: 'tourTitle',
                  render: (value) => (
                    <div className="text-sm text-gray-900 max-w-xs truncate">{value}</div>
                  )
                },
                {
                  header: 'Date',
                  key: 'bookingDate',
                  render: (value) => (
                    <div className="text-sm text-gray-900">{formatDate(value)}</div>
                  )
                },
                {
                  header: 'Status',
                  key: 'status',
                  render: (value) => <StatusBadge status={value} />
                },
                {
                  header: 'Commission',
                  key: 'commission',
                  render: (value, row) => (
                    <div className="text-sm font-medium text-green-600">
                      {formatCurrency(value, row.currency)}
                    </div>
                  )
                }
              ]}
              data={agentBookings.data.slice(0, 5)}
              loading={bookingsLoading}
              onRowClick={(booking) => console.log('View booking:', booking)}
            />
          ) : (
            <EmptyState
              icon={Calendar}
              title="No recent bookings"
              description="You haven't made any bookings recently."
            />
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              title="Add New Client"
              description="Register a new client"
              icon={UserPlus}
              color="blue"
              onClick={() => window.location.href = '/agent/clients/create'}
            />
            <QuickActionCard
              title="Create Booking"
              description="Make a new booking"
              icon={Plus}
              color="green"
              onClick={() => window.location.href = '/agent/bookings/create'}
            />
            <QuickActionCard
              title="View Commissions"
              description="Check commission reports"
              icon={Award}
              color="purple"
              onClick={() => window.location.href = '/agent/commissions'}
            />
            <QuickActionCard
              title="Performance Report"
              description="View performance metrics"
              icon={BarChart3}
              color="orange"
              onClick={() => window.location.href = '/agent/performance'}
            />
          </div>
        </div>

        {/* Recent Activity & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>

            <ActivityFeed
              activities={[
                {
                  description: 'Created booking for John Smith',
                  timestamp: '2 hours ago'
                },
                {
                  description: 'Added new client: Sarah Johnson',
                  timestamp: '5 hours ago'
                },
                {
                  description: 'Updated tour package pricing',
                  timestamp: '1 day ago'
                },
                {
                  description: 'Completed client consultation call',
                  timestamp: '2 days ago'
                },
                {
                  description: 'Sent follow-up email to prospects',
                  timestamp: '3 days ago'
                }
              ]}
              loading={statsLoading}
            />
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  task: 'Follow up with John Doe about Rwanda tour',
                  dueDate: '2025-08-15',
                  priority: 'high'
                },
                {
                  id: 2,
                  task: 'Prepare presentation for corporate client',
                  dueDate: '2025-08-18',
                  priority: 'medium'
                },
                {
                  id: 3,
                  task: 'Update client database with new contacts',
                  dueDate: '2025-08-20',
                  priority: 'low'
                }
              ].map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}