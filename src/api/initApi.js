const apiUsers = require('./apiUsers')
const apiCourses = require('./apiCourses')

module.exports = function initRestApi (app) {
  app.route('/api/users').get(apiUsers)

  app.route('/api/courses').get(apiCourses)
}
