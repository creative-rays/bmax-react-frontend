module.exports = function override(config, env) {
  // Exclude stylis-plugin-rtl from source-map-loader
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      return {
        ...rule,
        oneOf: rule.oneOf.map(oneOfRule => {
          if (
            oneOfRule.loader &&
            oneOfRule.loader.includes('source-map-loader')
          ) {
            oneOfRule.exclude = (oneOfRule.exclude || []).concat(/stylis-plugin-rtl/);
          }
          return oneOfRule;
        })
      };
    }
    return rule;
  });

  // Correct way to ignore specific warnings
  config.stats = config.stats || {};
  config.stats.warningsFilter = (warning) => {
    // Check the warning message and return true if it should be ignored
    return /Failed to parse source map/.test(warning);
  };

  return config;
};
