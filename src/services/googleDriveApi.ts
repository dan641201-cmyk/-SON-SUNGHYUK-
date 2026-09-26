import { getAccessToken } from './googleDriveAuth';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
}

export const formatFileSize = (bytes?: string | number): string => {
  if (!bytes) return '—';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num)) return '—';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  if (num < 1024 * 1024 * 1024) return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  return `${(num / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export const listGoogleDriveFiles = async (
  query = 'trashed = false',
  pageSize = 30,
  pageToken?: string
): Promise<{ files: GoogleDriveFile[]; nextPageToken?: string }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. Google 로그인이 필요합니다.');
  }

  const params = new URLSearchParams({
    pageSize: String(pageSize),
    fields: 'nextPageToken,files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,thumbnailLink,iconLink)',
    orderBy: 'modifiedTime desc',
    q: query,
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Google Drive 요청 실패 (${response.status})`);
  }

  return await response.json();
};

export const uploadFileToGoogleDrive = async (
  file: File,
  description = 'Uploaded via Video Portfolio App'
): Promise<GoogleDriveFile> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. Google 로그인이 필요합니다.');
  }

  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    description,
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,thumbnailLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `파일 업로드 실패 (${response.status})`);
  }

  return await response.json();
};

export const deleteGoogleDriveFile = async (fileId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. Google 로그인이 필요합니다.');
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `파일 삭제 실패 (${response.status})`);
  }
};
