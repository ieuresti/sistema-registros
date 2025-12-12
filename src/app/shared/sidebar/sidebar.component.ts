import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	sidebarMenu = [];

	constructor(
		private router: Router,
		private sidebarService: SidebarService
	) { }

	ngOnInit() {
		this.sidebarMenu = this.sidebarService.cargarMenuSidebar();
	}

	/**
	 * Metodo para cerrar sesión
	 */
	logout() {
		console.log('Sidebar logout');
		this.router.navigate(['/login']);
	}
}
