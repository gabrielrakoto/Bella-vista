import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CalendarCheck, MessageSquare, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";
import type { Reservation, ContactMessage } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const queryClient = useQueryClient();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Check if user is admin
  useEffect(() => {
    if (user && !user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  // Fetch reservations
  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ["/api/admin/reservations"],
    retry: false,
    enabled: !!user?.isAdmin,
  });

  // Fetch contact messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/admin/contact"],
    retry: false,
    enabled: !!user?.isAdmin,
  });

  // Update reservation status
  const updateReservationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PUT", `/api/admin/reservations/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reservations"] });
      toast({
        title: "Success",
        description: "Reservation status updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update reservation status",
        variant: "destructive",
      });
    },
  });

  // Delete reservation
  const deleteReservationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/reservations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reservations"] });
      toast({
        title: "Success",
        description: "Reservation deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete reservation",
        variant: "destructive",
      });
    },
  });

  // Mark message as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("PUT", `/api/admin/contact/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-warm-brown mx-auto"></div>
          <p className="mt-4 text-dark-brown">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-playfair font-bold text-dark-brown mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
            <Link href="/">
              <Button className="bg-warm-brown hover:bg-warm-brown/90 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-dark-brown">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your restaurant operations</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="reservations" className="data-[state=active]:bg-warm-brown data-[state=active]:text-white">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Reservations
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-warm-brown data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-warm-brown data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-brown font-playfair">Recent Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                {reservationsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warm-brown mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading reservations...</p>
                  </div>
                ) : reservations && reservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Time</th>
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Guest</th>
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Party Size</th>
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-dark-brown">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation: Reservation) => (
                          <tr key={reservation.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">{new Date(reservation.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{reservation.time}</td>
                            <td className="py-3 px-4">{reservation.firstName} {reservation.lastName}</td>
                            <td className="py-3 px-4">{reservation.guests}</td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadge(reservation.status || 'pending')}>
                                {reservation.status || 'pending'}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateReservationMutation.mutate({ 
                                    id: reservation.id, 
                                    status: reservation.status === 'confirmed' ? 'pending' : 'confirmed' 
                                  })}
                                  disabled={updateReservationMutation.isPending}
                                  className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteReservationMutation.mutate(reservation.id)}
                                  disabled={deleteReservationMutation.isPending}
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No reservations found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-brown font-playfair">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">User management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-brown font-playfair">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warm-brown mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading messages...</p>
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message: ContactMessage) => (
                      <div 
                        key={message.id} 
                        className={`p-4 rounded-lg border ${message.isRead ? 'bg-gray-50' : 'bg-white border-warm-brown'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-dark-brown">{message.name}</h4>
                            <p className="text-sm text-gray-600">{message.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </p>
                            {!message.isRead && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsReadMutation.mutate(message.id)}
                                disabled={markAsReadMutation.isPending}
                                className="mt-1 border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
                              >
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                        <h5 className="font-medium text-dark-brown mb-2">{message.subject}</h5>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No messages found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
