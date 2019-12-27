/* global algoliasearch instantsearch */

const searchClient = algoliasearch('JANRA19K71', 'a345491e56ba7434a97d791f379a5a0b');

const search = instantsearch({
  indexName: 'BCORP',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
    instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
  }),

  instantsearch.widgets.refinementList({
    container: '#category',
    attribute: 'categories',
  }),

instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="{{image}}" align="left" alt="{{name}}" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\{{Overall}}</div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);


search.start();
