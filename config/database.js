
module.exports = {
  database: {
    filename: process.env.DB_PATH || 'restaurant.db',
    options: {
      verbose: process.env.NODE_ENV === 'development' ? console.log : null,
      fileMustExist: false,
    }
  },
  
  // Backup settings
  backup: {
    enabled: true,
    interval: 24 * 60 * 60 * 1000, // 24 hours
    maxBackups: 7,
    directory: './backups'
  },
  
  // Performance settings
  performance: {
    pragma: {
      journal_mode: 'WAL',
      synchronous: 'NORMAL',
      cache_size: 1000,
      temp_store: 'MEMORY'
    }
  }
};
