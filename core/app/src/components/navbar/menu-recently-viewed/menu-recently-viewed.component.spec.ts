import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {take} from 'rxjs/operators';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MenuRecentlyViewedComponent} from './menu-recently-viewed.component';
import {LanguageStrings} from '@base/facades/language/language.facade';
import {languageMockData} from '@base/facades/language/language.facade.spec.mock';
import {MenuItemLinkComponent} from '@components/navbar/menu-item-link/menu-item-link.component';
import {ImageModule} from '@components/image/image.module';
import {ThemeImagesFacade} from '@base/facades/theme-images/theme-images.facade';
import {themeImagesMockData} from '@base/facades/theme-images/theme-images.facade.spec.mock';

const recentRecords = [
    {
        summary: 'Module 1',
        url: '/fake-module-1'
    },
    {
        summary: 'Module 2',
        url: '/fake-module-2'
    }
];

@Component({
    selector: 'menu-recently-viewed-test-host-component',
    template: '<scrm-menu-recently-viewed [records]="records" [languages]="languages"></scrm-menu-recently-viewed>'
})
class MenuRecentlyViewedTestHostComponent {
    records = recentRecords;
    languages: LanguageStrings = {
        ...languageMockData,
        languageKey: 'en_us'
    };
}

describe('MenuRecentlyViewedComponent', () => {
    let testHostComponent: MenuRecentlyViewedTestHostComponent;
    let testHostFixture: ComponentFixture<MenuRecentlyViewedTestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuItemLinkComponent,
                MenuRecentlyViewedComponent,
                MenuRecentlyViewedTestHostComponent
            ],
            imports: [
                AngularSvgIconModule,
                RouterTestingModule,
                HttpClientTestingModule,
                ImageModule,
                NgbModule,
            ],
            providers: [
                {
                    provide: ThemeImagesFacade, useValue: {
                        images$: of(themeImagesMockData).pipe(take(1))
                    }
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(MenuRecentlyViewedTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    });

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have label', () => {
        const title = testHostFixture.nativeElement.querySelector('h4');

        expect(title.textContent).toContain('Recently Viewed');
    });

    it('should have recently viewed record links', () => {

        const navItemLinks = testHostFixture.nativeElement.getElementsByClassName('nav-item');

        expect(navItemLinks.length).toEqual(2);

        let links = navItemLinks[0].getElementsByClassName('nav-link');

        expect(links.length).toEqual(1);
        expect(links[0].textContent).toContain('Module 1');
        expect(links[0].attributes.getNamedItem('href').value).toContain('/fake-module-1');

        links = navItemLinks[1].getElementsByClassName('nav-link');

        expect(links.length).toEqual(1);
        expect(links[0].textContent).toContain('Module 2');
        expect(links[0].attributes.getNamedItem('href').value).toContain('/fake-module-2');
    });
});
