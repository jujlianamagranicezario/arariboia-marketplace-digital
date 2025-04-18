
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Hook genérico para buscar dados
export function useSupabaseQuery<T>(
  table: string,
  queryKey: string[],
  options?: {
    columns?: string;
    filter?: { column: string; value: any }[];
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
  }
) {
  const fetchData = async () => {
    let query = supabase.from(table).select(options?.columns || '*');

    // Aplicar filtros se existirem
    if (options?.filter && options.filter.length > 0) {
      options.filter.forEach(f => {
        query = query.eq(f.column, f.value);
      });
    }

    // Ordenação
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    // Limite
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    // Buscar um único registro ou vários
    const { data, error } = options?.single
      ? await query.single()
      : await query;

    if (error) throw error;
    return data as T;
  };

  return useQuery({
    queryKey,
    queryFn: fetchData,
  });
}

// Hook para inserir dados
export function useSupabaseInsert<T, R = any>(table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newData: T) => {
      const { data, error } = await supabase.from(table).insert(newData).select();
      if (error) throw error;
      return data as R;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para recarregar dados
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

// Hook para atualizar dados
export function useSupabaseUpdate<T, R = any>(table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<T> }) => {
      const { data: responseData, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return responseData as R;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para recarregar dados
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

// Hook para deletar dados
export function useSupabaseDelete(table: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para recarregar dados
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

// Hook para uploads de arquivos
export function useSupabaseStorage(bucket: string) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (
    file: File,
    path?: string,
    options?: { upsert?: boolean; cacheControl?: string }
  ) => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      const filePath = path ? `${path}/${file.name}` : file.name;
      
      // Create a custom handler for upload progress
      let uploadProgress = 0;
      
      // Set up an interval to simulate progress since onUploadProgress isn't directly supported
      const progressInterval = setInterval(() => {
        if (uploadProgress < 95) {
          uploadProgress += 5;
          setProgress(uploadProgress);
        }
      }, 100);
      
      // Perform the upload without the onUploadProgress option
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: options?.upsert ?? false,
          cacheControl: options?.cacheControl ?? '3600',
        });

      // Clear the interval once upload is complete
      clearInterval(progressInterval);
      setProgress(100);

      if (uploadError) throw uploadError;

      // Obter URL pública do arquivo
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (path: string) => {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    progress,
    error,
  };
}
