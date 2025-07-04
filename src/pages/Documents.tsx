
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { toast } from '@/components/ui/sonner';
import { Upload, FileText, Eye, Trash2, CheckCircle, Clock, AlertCircle, Download, Filter, Search } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useDropzone } from 'react-dropzone';

const documentTypes = [
  { value: 'passport', label: 'Passport' },
  { value: 'ielts_certificate', label: 'IELTS Certificate' },
  { value: 'degree_certificate', label: 'Degree Certificate' },
  { value: 'transcripts', label: 'Academic Transcripts' },
  { value: 'experience_letter', label: 'Experience Letter' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'other', label: 'Other Documents' }
];

const Documents = () => {
  const [user, setUser] = useState<any>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { useClientDocuments, useUploadDocument, useFileUpload } = useCRM();
  const uploadDocumentMutation = useUploadDocument();
  const { uploadFile, uploading } = useFileUpload();

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { data: documents = [], isLoading } = useClientDocuments(user?.id || '');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isValidType) {
        toast.error(`${file.name}: Only PDF, JPG, and PNG files are allowed`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name}: File size must be less than 10MB`);
        return false;
      }
      return true;
    });

    setUploadingFiles(validFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: true
  });

  const handleUpload = async () => {
    if (!selectedDocType || uploadingFiles.length === 0 || !user?.id) {
      toast.error('Please select document type and files');
      return;
    }

    try {
      for (const file of uploadingFiles) {
        const fileName = `${user.id}/${selectedDocType}/${Date.now()}_${file.name}`;
        
        // Upload to Supabase Storage
        const fileUrl = await uploadFile('client-documents', fileName, file);
        
        if (fileUrl) {
          // Save document record
          await uploadDocumentMutation.mutateAsync({
            client_id: user.id,
            document_type: selectedDocType as any,
            file_name: file.name,
            file_url: fileUrl,
            file_size: file.size
          });
        }
      }

      toast.success('Documents uploaded successfully!');
      setUploadDialogOpen(false);
      setUploadingFiles([]);
      setSelectedDocType('');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload documents');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-success-green bg-success-green/10 border-success-green/20';
      case 'under_review':
        return 'text-action-orange bg-action-orange/10 border-action-orange/20';
      case 'rejected':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter((doc: any) => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.document_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-australia-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-600">Upload and manage your immigration documents</p>
          </div>
          
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-australia-blue hover:bg-australia-darkBlue">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-australia-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG files up to 10MB each
                  </p>
                </div>

                {uploadingFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files:</Label>
                    {uploadingFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="truncate">{file.name}</span>
                        <span className="text-gray-500">{formatFileSize(file.size)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedDocType || uploadingFiles.length === 0 || uploading}
                    className="flex-1 bg-australia-blue hover:bg-australia-darkBlue"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {documentTypes.map(type => {
            const count = documents.filter((doc: any) => doc.document_type === type.value).length;
            return (
              <Card key={type.value}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-australia-blue" />
                    <div>
                      <p className="text-sm font-medium">{type.label}</p>
                      <p className="text-xs text-gray-500">{count} file{count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-trust-blue" />
                Documents ({filteredDocuments.length})
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="uploaded">Uploaded</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-trust-blue/5 to-confidence-purple/5 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-trust-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No documents uploaded yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start building your document portfolio by uploading your required immigration documents
                </p>
                <Button 
                  onClick={() => setUploadDialogOpen(true)}
                  className="bg-gradient-to-r from-trust-blue to-confidence-purple hover:from-confidence-purple hover:to-trust-blue"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Document
                </Button>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc: any) => (
                  <div key={doc.id} className="group p-4 border border-border rounded-lg hover:shadow-md hover:border-trust-blue/30 transition-all duration-200 bg-gradient-to-r hover:from-background hover:to-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="bg-gradient-to-br from-trust-blue/10 to-confidence-purple/10 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-trust-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">{doc.file_name}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium capitalize">
                              {doc.document_type.replace('_', ' ')}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                              {formatFileSize(doc.file_size || 0)}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                              {new Date(doc.upload_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                          <span className="capitalize">{doc.status.replace('_', ' ')}</span>
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(doc.file_url, doc.file_name)}
                            className="h-8 w-8 p-0 hover:bg-trust-blue/10 hover:text-trust-blue"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(doc.file_url, '_blank')}
                            className="h-8 w-8 p-0 hover:bg-trust-blue/10 hover:text-trust-blue"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
