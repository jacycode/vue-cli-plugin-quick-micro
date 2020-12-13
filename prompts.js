module.exports = pkg => {

  const prompts = [
    {
      type: 'confirm',
      name: 'isMain',
      message: 'Is main app?',
      validate: input => !!input,
      default: false
    }
  ]

  if (pkg.quickMicro.type === 'sub') {
    prompts.push(
      {
        type: 'confirm',
        name: 'hasToken',
        message: 'Do you need to generate axios interceptors with reLogin and getToken function?',
        validate: input => !!input,
        default: true
      },
      {
        type: 'confirm',
        name: 'hasLifecycle',
        message: "Do you need to generate lifecycle hooks's config of qiankun?",
        validate: input => !!input,
        default: true 
      }
    )
  } else if (pkg.quickMicro.type === 'main') {
    prompts.push(
      {
        type: 'confirm',
        name: 'loadApp',
        message: 'Do you need to generate a vue template for loading micro app?',
        validate: input => !!input,
        default: true
      },
    )
  }

  return prompts
}