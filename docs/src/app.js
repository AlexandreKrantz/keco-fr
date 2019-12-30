/* global algoliasearch instantsearch */

const searchClient = algoliasearch('JANRA19K71', 'a345491e56ba7434a97d791f379a5a0b');

const search = instantsearch({
  indexName: 'dev_BCORP',
  searchClient,
  routing:true
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for an item!',
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
        <div class="container-fluid hit-template">
          <div class="row">
            <div class="col-sm-4" id="hit-image"> 
              <img src="{{image}}" alt="{{name}}" class="rounded img-fluid" />
            </div>

            <div class="col-sm-8">
              <div class="hit-name">
                <h5><a href="{{url}}" target="_blank">{{name}}</a> <a href="{{BCORP_url}}"><span class="hit-rating badge badge-secondary float-right">\{{Overall}}</span></a></h5>
              </div>

              <div class="hit-description">
                <p>{{description}}</p>
              </div>
            </div>
          </div>

        </div>
      `,
      empty: getNothing('no-results'),
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.addWidgets([
  instantsearch.widgets.analytics({
    pushFunction(formattedParameters, state, results) {
      window.ga('set', 'page', window.location.pathname + window.location.search);
      window.ga('send', 'pageView');
    },
  })
]);


search.start();

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getNothing(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
  //hide elements using DOM
}