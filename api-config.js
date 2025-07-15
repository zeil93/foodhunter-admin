/**
 * FoodHunter API Configuration
 * 
 * This file contains configuration for the FoodHunter API.
 * Note: In a production environment, sensitive information like tokens
 * should be stored in environment variables, not in code.
 */

export const API_CONFIG = {
  // API base URL
  baseUrl: 'https://xromconsulting.com/foodhunter',
  
  // Admin token for API access
  adminToken: '2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl',
  
  // API version
  apiVersion: 'v1',
  
  // Full API documentation URL
  swaggerUrl: 'https://xromconsulting.com/foodhunter/swagger/'
};

/**
 * Helper function to create headers with authentication
 * @returns {Object} Headers object with authorization
 */
export const getAuthHeaders = () => {
  return {
    'Authorization': `Bearer ${API_CONFIG.adminToken}`,
    'Content-Type': 'application/json'
  };
};

/**
 * Helper function to build API URLs
 * @param {string} endpoint - API endpoint path
 * @param {boolean} isAdmin - Whether this is an admin API endpoint
 * @returns {string} Full API URL
 */
export const buildApiUrl = (endpoint, isAdmin = true) => {
  const basePath = isAdmin ? `/api/${API_CONFIG.apiVersion}/admin` : `/api/${API_CONFIG.apiVersion}`;
  return `${API_CONFIG.baseUrl}${basePath}${endpoint}`;
};
