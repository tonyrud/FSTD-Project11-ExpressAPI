const apiGetUsers = require('./getRequests')

function initRestApi (app) {
  app.route('/api/courses').get(apiGetUsers)
  // app.route('/api/courses/:id').get(apiGetCourseDetail)

  // app.route('/api/lesson').post(apiCreateLesson)
  // app.route('/api/lesson/:id').patch(apiPatchLesson)

  // app.route('/api/lesson/:id').delete(apiDeleteLesson)
}

module.exports = initRestApi
