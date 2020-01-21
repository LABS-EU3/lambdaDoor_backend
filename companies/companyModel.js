const db = require('../database/db-config');

function getCompanies() {
  return db('companies');
}

function getTopRated() {
  return db
    .select('c.id', 'c.name', 'c.description')
    .avg('cr.ratings as average_rating')
    .from('companies as c')
    .leftJoin('company_reviews as cr', 'c.id', 'cr.company_id')
    .groupBy('c.id', 'c.name', 'c.description')
    .orderBy('average_rating', 'desc')
    .whereNotNull('cr.ratings')
    .limit(10);
}

function findCompanyById(id) {
  return db('companies')
    .where({ id })
    .first();
}
async function addCompany(company) {
  const ids = await db('companies').insert(company, 'id');
  return findCompanyById(ids[0]);
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function getClosest(id) {
  const user = await findUserById(id);
  return db('companies as c')
    .select(
      'c.id',
      'c.name',
      'c.website',
      'c.description',
      'c.latitude',
      'c.longitude'
    )
    .where(function() {
      this.where('c.latitude', '<', Number(user.latitude) + 0.5).andWhere(
        'c.latitude',
        '>',
        Number(user.latitude) - 0.5
      );
    })
    .andWhere(function() {
      this.where('c.longitude', '<', Number(user.longitude) + 0.5).andWhere(
        'c.longitude',
        '>',
        Number(user.longitude) - 0.5
      );
    });
}

// The current distance is set at approximately 111km from the user's position (1 degree of latitude or longitude/plus and minus 0.5). This can easily be adjusted here if desired.

module.exports = {
  getCompanies,
  getTopRated,
  findCompanyById,
  getClosest,
  findUserById,
  addCompany,
};
