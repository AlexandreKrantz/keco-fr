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
  instantsearch.widgets.refinementList({
    container: '#location',
    attribute: 'location',
  }),

instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4" id="hit-image"> 
              <img src="{{image}}" alt="{{name}}" class="rounded img-fluid" />
            </div>

            <div class="col-sm-8">
              <div class="hit-name">
                <h5>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}} <a href="{{BCORP_url}}"><span class="hit-rating badge badge-secondary float-right">\{{Overall}}</span></a></h5>
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
