import { useNavigate } from 'react-router-dom';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Unauthorized</CardTitle>
          <CardDescription className="text-center">
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => navigate('/admin/login')} className="w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

