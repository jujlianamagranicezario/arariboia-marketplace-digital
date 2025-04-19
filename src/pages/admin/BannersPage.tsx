
import React, { useState } from 'react';
import { useSupabaseQuery, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete, useSupabaseStorage } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Image, ExternalLink, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface Banner {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

type NewBanner = Omit<Banner, 'id' | 'created_at'>;

const BannersPage = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [newBanner, setNewBanner] = useState<NewBanner>({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    is_active: true,
    expires_at: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch banners
  const { data: banners, isLoading } = useSupabaseQuery<Banner[]>(
    'ad_banners',
    ['ad_banners'],
    {
      orderBy: { column: 'created_at', ascending: false },
    }
  );

  // Mutations
  const insertBanner = useSupabaseInsert<NewBanner>('ad_banners');
  const updateBanner = useSupabaseUpdate<Partial<Banner>>('ad_banners');
  const deleteBanner = useSupabaseDelete('ad_banners');
  const { uploadFile, uploading, progress } = useSupabaseStorage('banner_images');

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (isEditDialogOpen && selectedBanner) {
      setSelectedBanner({
        ...selectedBanner,
        [name]: value,
      });
    } else {
      setNewBanner({
        ...newBanner,
        [name]: value,
      });
    }
  };

  // Handle image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle switch toggle
  const handleSwitchChange = (checked: boolean) => {
    if (isEditDialogOpen && selectedBanner) {
      setSelectedBanner({
        ...selectedBanner,
        is_active: checked,
      });
    } else {
      setNewBanner({
        ...newBanner,
        is_active: checked,
      });
    }
  };

  // Add new banner
  const handleAddBanner = async () => {
    try {
      let imageUrl = newBanner.image_url;

      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'banners');
      }

      if (!imageUrl) {
        toast({
          title: "Erro",
          description: "É necessário fornecer uma imagem para o banner.",
          variant: "destructive",
        });
        return;
      }

      await insertBanner.mutateAsync({
        ...newBanner,
        image_url: imageUrl,
      });

      toast({
        title: "Sucesso",
        description: "Banner adicionado com sucesso!",
      });

      setIsAddDialogOpen(false);
      setNewBanner({
        title: '',
        description: '',
        image_url: '',
        link_url: '',
        is_active: true,
        expires_at: null,
      });
      setImageFile(null);

    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Falha ao adicionar banner.",
        variant: "destructive",
      });
    }
  };

  // Update banner
  const handleUpdateBanner = async () => {
    if (!selectedBanner) return;

    try {
      let imageUrl = selectedBanner.image_url;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'banners');
      }

      await updateBanner.mutateAsync({
        id: selectedBanner.id,
        data: {
          ...selectedBanner,
          image_url: imageUrl,
        },
      });

      toast({
        title: "Sucesso",
        description: "Banner atualizado com sucesso!",
      });

      setIsEditDialogOpen(false);
      setSelectedBanner(null);
      setImageFile(null);

    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Falha ao atualizar banner.",
        variant: "destructive",
      });
    }
  };

  // Delete banner
  const handleDeleteBanner = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;

    try {
      await deleteBanner.mutateAsync(id);
      
      toast({
        title: "Sucesso",
        description: "Banner excluído com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Falha ao excluir banner.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Banners</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-arariboia-green hover:bg-arariboia-green/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Banner</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar um novo banner.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={newBanner.title}
                  onChange={handleChange}
                  placeholder="Título do banner"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newBanner.description}
                  onChange={handleChange}
                  placeholder="Descrição curta do banner"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link_url">URL de Destino</Label>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <Input
                    id="link_url"
                    name="link_url"
                    value={newBanner.link_url}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/pagina-destino"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Imagem do Banner</Label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      id="image_url"
                      name="image_url"
                      value={newBanner.image_url}
                      onChange={handleChange}
                      placeholder="URL da imagem (ou faça upload abaixo)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_upload" className="block mb-2 text-sm text-gray-500">
                      Ou faça upload de uma imagem:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="image_upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="flex-1"
                      />
                      {imageFile && (
                        <div className="text-xs text-gray-500">
                          {imageFile.name.substring(0, 20)}
                          {imageFile.name.length > 20 ? "..." : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newBanner.is_active}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_active">Banner Ativo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-arariboia-green hover:bg-arariboia-green/90 text-white"
                onClick={handleAddBanner}
                disabled={inserting || uploading}
              >
                {uploading ? `Enviando... ${progress}%` : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="w-full py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arariboia-brown"></div>
        </div>
      ) : banners && banners.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="relative h-16 w-24 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/240x160?text=Imagem+não+disponível';
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{banner.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[250px]">
                      {banner.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    banner.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {banner.is_active ? 'Ativo' : 'Inativo'}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(banner.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteBanner(banner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <Image className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum banner encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece adicionando um novo banner.</p>
          <div className="mt-6">
            <Button 
              className="bg-arariboia-green hover:bg-arariboia-green/90 text-white"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Banner
            </Button>
          </div>
        </div>
      )}

      {/* Edit Banner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Banner</DialogTitle>
            <DialogDescription>
              Atualize as informações do banner.
            </DialogDescription>
          </DialogHeader>
          {selectedBanner && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={selectedBanner.title}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={selectedBanner.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-link_url">URL de Destino</Label>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <Input
                    id="edit-link_url"
                    name="link_url"
                    value={selectedBanner.link_url}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Imagem do Banner</Label>
                <div className="mb-2">
                  <img 
                    src={selectedBanner.image_url} 
                    alt={selectedBanner.title}
                    className="h-32 object-cover rounded-md" 
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      id="edit-image_url"
                      name="image_url"
                      value={selectedBanner.image_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-image_upload" className="block mb-2 text-sm text-gray-500">
                      Ou faça upload de uma nova imagem:
                    </Label>
                    <Input
                      id="edit-image_upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {imageFile && (
                      <div className="mt-1 text-xs text-gray-500">
                        {imageFile.name.substring(0, 20)}
                        {imageFile.name.length > 20 ? "..." : ""}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={selectedBanner.is_active}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="edit-is_active">Banner Ativo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedBanner(null);
              setImageFile(null);
            }}>
              Cancelar
            </Button>
            <Button 
              className="bg-arariboia-green hover:bg-arariboia-green/90 text-white"
              onClick={handleUpdateBanner}
              disabled={updating || uploading}
            >
              {uploading ? `Enviando... ${progress}%` : "Atualizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannersPage;
