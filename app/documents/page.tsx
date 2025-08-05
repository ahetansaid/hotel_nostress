'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { QuickNav } from '@/components/layout/quick-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  Download,
  Eye,
  Printer,
  Share2,
  Search,
  Calendar,
  User,
  Folder,
  Upload,
  Trash2,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'spreadsheet' | 'text' | 'video';
  category: 'reservation' | 'billing' | 'contract' | 'policy' | 'report' | 'manual';
  size: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  status: 'active' | 'archived' | 'draft';
  tags: string[];
  description: string;
  downloadCount: number;
}

export default function DocumentsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données de démonstration
  const documents: Document[] = [
    {
      id: 'DOC001',
      name: 'Contrat de réservation standard',
      type: 'pdf',
      category: 'contract',
      size: '2.5 MB',
      uploadedBy: 'Marie Dupont',
      uploadDate: '2024-12-01',
      lastModified: '2024-12-10',
      status: 'active',
      tags: ['contrat', 'réservation', 'standard'],
      description: 'Modèle de contrat standard pour les réservations',
      downloadCount: 45
    },
    {
      id: 'DOC002',
      name: 'Rapport financier décembre 2024',
      type: 'spreadsheet',
      category: 'report',
      size: '1.8 MB',
      uploadedBy: 'Jean Martin',
      uploadDate: '2024-12-15',
      lastModified: '2024-12-15',
      status: 'active',
      tags: ['finances', 'rapport', 'décembre'],
      description: 'Rapport financier mensuel de décembre 2024',
      downloadCount: 12
    },
    {
      id: 'DOC003',
      name: 'Plan de l\'hôtel',
      type: 'image',
      category: 'policy',
      size: '3.2 MB',
      uploadedBy: 'Sophie Bernard',
      uploadDate: '2024-11-20',
      lastModified: '2024-12-05',
      status: 'active',
      tags: ['plan', 'hôtel', 'architecture'],
      description: 'Plan détaillé de l\'hôtel avec numérotation des chambres',
      downloadCount: 78
    },
    {
      id: 'DOC004',
      name: 'Manuel d\'utilisation système',
      type: 'pdf',
      category: 'manual',
      size: '5.1 MB',
      uploadedBy: 'Pierre Durand',
      uploadDate: '2024-10-15',
      lastModified: '2024-11-30',
      status: 'active',
      tags: ['manuel', 'système', 'utilisation'],
      description: 'Guide complet d\'utilisation du système de gestion',
      downloadCount: 23
    },
    {
      id: 'DOC005',
      name: 'Facture modèle',
      type: 'pdf',
      category: 'billing',
      size: '0.8 MB',
      uploadedBy: 'Anne Moreau',
      uploadDate: '2024-12-12',
      lastModified: '2024-12-12',
      status: 'active',
      tags: ['facture', 'modèle', 'billing'],
      description: 'Modèle de facture standard',
      downloadCount: 34
    },
    {
      id: 'DOC006',
      name: 'Politique de remboursement',
      type: 'pdf',
      category: 'policy',
      size: '1.2 MB',
      uploadedBy: 'Lucas Petit',
      uploadDate: '2024-09-10',
      lastModified: '2024-12-01',
      status: 'active',
      tags: ['politique', 'remboursement', 'règles'],
      description: 'Politique de remboursement et conditions',
      downloadCount: 56
    },
    {
      id: 'DOC007',
      name: 'Réservation #12345 - Marie Dupont',
      type: 'pdf',
      category: 'reservation',
      size: '1.5 MB',
      uploadedBy: 'Système',
      uploadDate: '2024-12-10',
      lastModified: '2024-12-10',
      status: 'active',
      tags: ['réservation', 'client', 'confirmation'],
      description: 'Confirmation de réservation pour Marie Dupont',
      downloadCount: 3
    },
    {
      id: 'DOC008',
      name: 'Ancien contrat 2023',
      type: 'pdf',
      category: 'contract',
      size: '2.1 MB',
      uploadedBy: 'Marie Dupont',
      uploadDate: '2023-12-01',
      lastModified: '2023-12-01',
      status: 'archived',
      tags: ['contrat', 'ancien', '2023'],
      description: 'Ancien modèle de contrat de 2023',
      downloadCount: 8
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <FileImage className="h-8 w-8 text-green-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
      case 'text':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <FileText className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'archived':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'draft':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'archived':
        return 'Archivé';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'reservation':
        return 'Réservations';
      case 'billing':
        return 'Facturation';
      case 'contract':
        return 'Contrats';
      case 'policy':
        return 'Politiques';
      case 'report':
        return 'Rapports';
      case 'manual':
        return 'Manuels';
      default:
        return 'Autre';
    }
  };

  const filteredDocuments = documents.filter(document => {
    const tabFilter = selectedTab === 'all' || document.status === selectedTab;
    const categoryFilter = selectedCategory === 'all' || document.category === selectedCategory;
    const searchFilter = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        document.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        document.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return tabFilter && categoryFilter && searchFilter;
  });

  const totalDocuments = documents.length;
  const activeDocuments = documents.filter(d => d.status === 'active').length;
  const archivedDocuments = documents.filter(d => d.status === 'archived').length;
  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloadCount, 0);

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Gestion des Documents" 
        subtitle="Organisez et gérez tous vos documents"
        showBackButton={true}
      />
      
      <Breadcrumb items={[
        { label: 'Documents' }
      ]} />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Documents</p>
                <p className="text-2xl font-bold text-blue-900">{totalDocuments}</p>
              </div>
              <Folder className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Actifs</p>
                <p className="text-2xl font-bold text-green-900">{activeDocuments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Archivés</p>
                <p className="text-2xl font-bold text-gray-900">{archivedDocuments}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Téléchargements</p>
                <p className="text-2xl font-bold text-purple-900">{totalDownloads}</p>
              </div>
              <Download className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Upload className="h-4 w-4 mr-2" />
            Nouveau Document
          </Button>
          <Button variant="outline">
            <Folder className="h-4 w-4 mr-2" />
            Nouveau Dossier
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      {/* Recherche et Filtres */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher des documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="reservation">Réservations</SelectItem>
              <SelectItem value="billing">Facturation</SelectItem>
              <SelectItem value="contract">Contrats</SelectItem>
              <SelectItem value="policy">Politiques</SelectItem>
              <SelectItem value="report">Rapports</SelectItem>
              <SelectItem value="manual">Manuels</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Type de fichier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="spreadsheet">Tableurs</SelectItem>
              <SelectItem value="text">Documents texte</SelectItem>
              <SelectItem value="video">Vidéos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Onglets et Liste */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            Tous ({totalDocuments})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            Actifs ({activeDocuments})
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            Archivés ({archivedDocuments})
          </TabsTrigger>
          <TabsTrigger value="draft" className="flex items-center gap-2">
            Brouillons ({documents.filter(d => d.status === 'draft').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <DocumentsList documents={filteredDocuments} />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <DocumentsList documents={filteredDocuments} />
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <DocumentsList documents={filteredDocuments} />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <DocumentsList documents={filteredDocuments} />
        </TabsContent>
      </Tabs>

      <QuickNav currentPage="/documents" />
    </div>
  );
}

function DocumentsList({ documents }: { documents: Document[] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <FileImage className="h-8 w-8 text-green-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
      case 'text':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <FileText className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'archived':
        return 'Archivé';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  if (documents.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
          <p className="text-gray-600">Aucun document ne correspond à vos critères de recherche.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((document) => (
        <Card key={document.id} className="transition-all duration-200 hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getTypeIcon(document.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-gray-900 truncate">{document.name}</h4>
                  <Badge variant="outline" className={getStatusColor(document.status)}>
                    {getStatusText(document.status)}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {document.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{document.size}</span>
                    <span>{document.downloadCount} téléchargements</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    <span>{document.uploadedBy}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(document.lastModified).toLocaleDateString('fr-FR')}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {document.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {document.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{document.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 