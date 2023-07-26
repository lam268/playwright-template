const common = `
  --require-module ts-node/register
  --require src/support/*.ts
  --require src/step-definitions/common/*.ts
  --format summary 
  --format progress-bar 
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --format json:cucumber_report_${process.argv[process.argv.length - 1]}.json
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
