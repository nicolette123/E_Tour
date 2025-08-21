// Authentication Testing Page
import AuthTester from '../../components/testing/AuthTester';

export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AuthTester />
    </div>
  );
}

export const metadata = {
  title: 'Authentication Test - E_Tour',
  description: 'Test authentication functionality',
};
