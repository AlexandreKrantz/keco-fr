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
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-8">
              <img src="{{image}}" alt="{{name}}" align="left" class="rounded img-fluid" />
            </div>
            
            <div class="col-xs-4">
              <a href="{{BCORP_url}}"><div class="hit-rating badge badge-secondary">\{{Overall}}</div></a>
            </div>
          </div>

          <div class="row">
            <div class="hit-name">
              <h3>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h3>
            </div>

            <div class="hit-description">
              {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
            </div>
          </div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);


search.start();
