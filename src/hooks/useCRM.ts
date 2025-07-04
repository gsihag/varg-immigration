
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CRMClient } from '@/utils/crmClient';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];
type ClientInsert = Database['public']['Tables']['clients']['Insert'];
type DocumentInsert = Database['public']['Tables']['documents']['Insert'];
type CaseInsert = Database['public']['Tables']['cases']['Insert'];
type ConsultationInsert = Database['public']['Tables']['consultations']['Insert'];

export const useCRM = () => {
  const queryClient = useQueryClient();

  // Client queries
  const useClients = () => {
    return useQuery({
      queryKey: ['clients'],
      queryFn: CRMClient.getAllClients,
    });
  };

  const useClient = (clientId: string, options?: { enabled?: boolean; staleTime?: number; refetchOnWindowFocus?: boolean }) => {
    return useQuery({
      queryKey: ['client', clientId],
      queryFn: () => CRMClient.getClientById(clientId),
      enabled: options?.enabled ?? !!clientId,
      staleTime: options?.staleTime,
      refetchOnWindowFocus: options?.refetchOnWindowFocus,
    });
  };

  // Client mutations
  const useCreateClient = () => {
    return useMutation({
      mutationFn: (clientData: ClientInsert) => CRMClient.createClient(clientData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
    });
  };

  const useUpdateClient = () => {
    return useMutation({
      mutationFn: ({ clientId, updates }: { clientId: string; updates: Partial<Client> }) =>
        CRMClient.updateClient(clientId, updates),
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ['clients'] });
          queryClient.invalidateQueries({ queryKey: ['client', data.id] });
        }
      },
    });
  };

  // Document queries and mutations
  const useClientDocuments = (clientId: string) => {
    return useQuery({
      queryKey: ['documents', clientId],
      queryFn: () => CRMClient.getClientDocuments(clientId),
      enabled: !!clientId,
    });
  };

  const useUploadDocument = () => {
    return useMutation({
      mutationFn: (documentData: DocumentInsert) => CRMClient.uploadDocument(documentData),
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ['documents', data.client_id] });
        }
      },
    });
  };

  // Case queries and mutations
  const useClientCases = (clientId: string) => {
    return useQuery({
      queryKey: ['cases', clientId],
      queryFn: () => CRMClient.getClientCases(clientId),
      enabled: !!clientId,
    });
  };

  const useCreateCase = () => {
    return useMutation({
      mutationFn: (caseData: Omit<CaseInsert, 'case_number'>) => CRMClient.createCase(caseData),
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ['cases', data.client_id] });
        }
      },
    });
  };

  // Consultation queries and mutations
  const useClientConsultations = (clientId: string) => {
    return useQuery({
      queryKey: ['consultations', clientId],
      queryFn: () => CRMClient.getClientConsultations(clientId),
      enabled: !!clientId,
    });
  };

  const useScheduleConsultation = () => {
    return useMutation({
      mutationFn: (consultationData: ConsultationInsert) => CRMClient.scheduleConsultation(consultationData),
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ['consultations', data.client_id] });
        }
      },
    });
  };

  // Conversation queries and mutations
  const useClientConversations = (clientId: string, sessionId?: string) => {
    return useQuery({
      queryKey: ['conversations', clientId, sessionId],
      queryFn: () => CRMClient.getClientConversations(clientId, sessionId),
      enabled: !!clientId,
    });
  };

  const useSaveConversation = () => {
    return useMutation({
      mutationFn: (conversationData: Database['public']['Tables']['ritu_conversations']['Insert']) =>
        CRMClient.saveRituConversation(conversationData),
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ['conversations', data.client_id] });
        }
      },
    });
  };

  // File upload
  const useFileUpload = () => {
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (
      bucket: 'client-documents' | 'system-templates',
      filePath: string,
      file: File
    ): Promise<string | null> => {
      setUploading(true);
      try {
        const url = await CRMClient.uploadFileToStorage(bucket, filePath, file);
        return url;
      } finally {
        setUploading(false);
      }
    };

    return { uploadFile, uploading };
  };

  return {
    // Client operations
    useClients,
    useClient,
    useCreateClient,
    useUpdateClient,
    
    // Document operations
    useClientDocuments,
    useUploadDocument,
    
    // Case operations
    useClientCases,
    useCreateCase,
    
    // Consultation operations
    useClientConsultations,
    useScheduleConsultation,
    
    // Conversation operations
    useClientConversations,
    useSaveConversation,
    
    // File operations
    useFileUpload,
  };
};
