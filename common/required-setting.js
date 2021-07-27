function requiredSetting(name) {
  const val = process.env[name];
  if (val === undefined || val === '') {
    throw new Error(`The environment variable ${name} must be set.`);
  }
  return val;
}

module.exports = { requiredSetting };