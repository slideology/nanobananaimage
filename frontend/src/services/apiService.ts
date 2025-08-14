import axios from 'axios';

const API_BASE_URL = '/api';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.data && response.data.data.url) {
      return response.data.data.url;
    }
    throw new Error('Server returned incorrect image URL format');
  } catch (error) {
    console.error('Image upload failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Unknown server error during image upload');
    }
    throw new Error('Image upload failed, please check network connection');
  }
};

export const generateImageWithUploadedFile = async (
  imageUrl: string,
  prompt: string,
  params: { [key: string]: any }
): Promise<{ taskId: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-with-image`, {
      imageUrl,
      prompt,
      size: params.aspectRatio,
      // style_strength: params.styleStrength // If API supports, can uncomment
    });
    if (response.data && response.data.data.taskId) {
      return { taskId: response.data.data.taskId };
    }
    throw new Error('Server failed to start generation task');
  } catch (error) {
    console.error('Image generation request failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Unknown server error when requesting image generation');
    }
    throw new Error('Image generation request failed, please check network connection');
  }
};

export const getTaskStatus = async (taskId: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get task ${taskId} status:`, error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Unknown server error when getting task status');
    }
    throw new Error('Failed to get task status');
  }
};