// src/services/backupService.js
import api from "../api/api";

export const backupService = {
  /**
   * Fetch list of all existing database backups.
   * Uses authenticated /backups when token is present, falls back to /dev/backups for local dev.
   */
  getBackups: async () => {
    try {
      const endpoint = localStorage.getItem("token") ? "/backups" : "/dev/backups";
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching backups:", error);
      throw error;
    }
  },

  /**
   * Trigger a new database SQL dump.
   */
  createBackup: async () => {
    try {
      const endpoint = localStorage.getItem("token") ? "/backups" : "/dev/backups";
      const response = await api.post(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error creating backup:", error);
      throw error;
    }
  },

  /**
   * Stream and download a backup file (.sql) to the client's browser.
   */
  downloadBackup: async (filename) => {
    try {
      const endpoint = localStorage.getItem("token")
        ? `/backups/${filename}`
        : `/dev/backups/${filename}`;

      const response = await api.get(endpoint, {
        responseType: "blob",
      });

      // Create an invisible anchor to trigger browser file download
      const blob = new Blob([response.data], { type: "application/octet-stream" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      return true;
    } catch (error) {
      console.error(`Error downloading backup ${filename}:`, error);
      throw error;
    }
  },

  /**
   * Delete a single backup file by filename.
   */
  deleteBackup: async (filename) => {
    try {
      const endpoint = localStorage.getItem("token")
        ? `/backups/${filename}`
        : `/dev/backups/${filename}`;
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error deleting backup ${filename}:`, error);
      throw error;
    }
  },

  /**
   * Purge all backup files on the server (requires confirmation).
   */
  deleteAllBackups: async () => {
    try {
      const endpoint = localStorage.getItem("token") ? "/backups" : "/dev/backups";
      const response = await api.delete(endpoint, {
        data: { confirm: true },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting all backups:", error);
      throw error;
    }
  },
};

export default backupService;
