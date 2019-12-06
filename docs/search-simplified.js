/* global instantsearch */

/*
app({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'instant_search',
  searchParameters: {
    hitsPerPage: 10,
  },
});
*/

app({
  appId: 'JANRA19K71',
  apiKey: 'a345491e56ba7434a97d791f379a5a0b',
  indexName: 'BCORP',
  searchParameters: {
    hitsPerPage: 10,
  },
});

function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction: opts.searchFunction,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for an item',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );

  search.addWidget(
    instantsearch.widgets.sortBySelector({
      container: '#sort-by',
      autoHideContainer: true,
      indices: [
        {
          name: opts.indexName,
          label: 'Overall B Impact',
        },
        /*
        {
          name: `${opts.indexName}_Governance`,
          label: 'Governance',
        },
        */
        {
          name: `${opts.indexName}_Workers`,
          label: 'Workers',
        },
        {
          name: `${opts.indexName}_Community`,
          label: 'Community',
        },
        {
          name: `${opts.indexName}_Environment`,
          label: 'Environment',
        },
        /*
        {
          name: `${opts.indexName}_Customers`,
          label: 'Customers',
        },
        */
      ],
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input',
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#category',
      attributeName: 'categories',
      operator: 'or',
      templates: {
        header: getHeader('Category'),
      },
    })
  );


  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#location',
      attributeName: 'location',
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search for a location',
        templates: {
          noResults: '<div class="sffv_no-results">No matching location.</div>',
        },
      },
      templates: {
        header: getHeader('Location'),
      },
    })
  );

  /*
  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#type',
      attributeName: 'type',
      operator: 'and',
      templates: {
        header: getHeader('Type'),
      },
    })
  );
  */

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}
