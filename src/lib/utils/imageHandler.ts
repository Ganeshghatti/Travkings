import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const UPLOAD_DIR = join(process.cwd(), "public", "packages");
const BLOG_UPLOAD_DIR = join(process.cwd(), "public", "blogs");

/**
 * Validate image file type and size
 */
export async function validateImageFile(
  file: File
): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${
        MAX_FILE_SIZE / 1024 / 1024
      }MB`,
    };
  }

  // Check file type
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_EXTENSIONS.join(
        ", "
      )}`,
    };
  }

  // Check MIME type
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file MIME type",
    };
  }

  return { valid: true };
}

/**
 * Generate a unique filename using current timestamp
 */
export function generateImageFilename(originalName: string): string {
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const timestamp = Date.now();
  return `thumbnail_${timestamp}.${extension}`;
}

/**
 * Generate a unique filename for blog images
 */
export function generateBlogImageFilename(originalName: string): string {
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const timestamp = Date.now();
  return `blog_${timestamp}.${extension}`;
}

/**
 * Ensure upload directory exists
 */
async function ensureUploadDir(): Promise<void> {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Ensure blog upload directory exists
 */
async function ensureBlogUploadDir(): Promise<void> {
  if (!existsSync(BLOG_UPLOAD_DIR)) {
    await mkdir(BLOG_UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Upload thumbnail image and optionally delete old one
 */
export async function uploadThumbnail(
  file: File,
  oldFilename?: string
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    // Validate file
    const validation = await validateImageFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Ensure upload directory exists
    await ensureUploadDir();

    // Generate new filename
    const filename = generateImageFilename(file.name);
    const filePath = join(UPLOAD_DIR, filename);

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file
    await writeFile(filePath, buffer);

    // Delete old file if provided and different from new one
    if (oldFilename && oldFilename !== filename) {
      await deleteImage(oldFilename);
    }

    return { success: true, filename };
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

/**
 * Delete image from public folder
 */
export async function deleteImage(
  filename: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!filename) {
      return { success: true }; // No file to delete
    }

    const filePath = join(UPLOAD_DIR, filename);

    // Check if file exists before trying to delete
    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    // Don't throw error if file doesn't exist
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { success: true }; // File already doesn't exist
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}

/**
 * Upload blog thumbnail image and optionally delete old one
 */
export async function uploadBlogThumbnail(
  file: File,
  oldFilename?: string
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    const validation = await validateImageFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    await ensureBlogUploadDir();

    const filename = generateBlogImageFilename(file.name);
    const filePath = join(BLOG_UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    if (oldFilename && oldFilename !== filename) {
      await deleteBlogImage(oldFilename);
    }

    return { success: true, filename };
  } catch (error) {
    console.error("Error uploading blog thumbnail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

/**
 * Delete blog image from public folder
 */
export async function deleteBlogImage(
  filename: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!filename) {
      return { success: true };
    }

    const filePath = join(BLOG_UPLOAD_DIR, filename);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog image:", error);
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { success: true };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}
